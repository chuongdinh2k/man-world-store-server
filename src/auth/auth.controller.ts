import {
  Controller,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Body, Get, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RefreshTokenDto } from 'src/users/dto/refresh-token.dto';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { registrationStatus } from './interfaces/registration-status';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @Post('refreshToken')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<string> {
    // const refreshTokenParam = req.cookies['refreshToken'];
    const { token } = refreshTokenDto;
    try {
      const refreshToken = await this.authService.refreshToken(token);
      return refreshToken;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Req() req: any): Promise<any> {
    return req.user;
  }
}
