import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { registrationStatus } from './interfaces/registration-status';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<registrationStatus> {
    let status: registrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.create(userDto);
    } catch (err: any) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findOneByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);
    const refreshToken = await this._createRefreshToken(user);
    return {
      email: user.email,
      refreshToken,
      ...token,
    };
  }
  async refreshToken(refreshToken: string): Promise<any> {
    console.log('refreshToken', refreshToken);
    const data = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_TOKEN_REFRESH_SECRET,
    });
    const accessToken = await this._createRefreshToken(data);
    return {
      accessToken,
    };
  }

  private _createToken({ email }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  private async _createRefreshToken({ email }: UserDto): Promise<string> {
    const expiresIn = process.env.JWT_REFRESH_EXPIRESIN;
    const tokenRefreshSecret = process.env.JWT_TOKEN_REFRESH_SECRET;
    const options = {
      expiresIn: expiresIn || '7d',
      secret: tokenRefreshSecret,
    };
    const refreshToken = this.jwtService.sign({ email }, options);
    return refreshToken;
  }
  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
