import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { registrationStatus } from './interfaces/registration-status';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<registrationStatus> {
    const result = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
