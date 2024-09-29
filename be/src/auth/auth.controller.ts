import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResultDto } from './dto/auth-result.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Enter to site using email and password' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthResultDto,
    description: 'User Id',
  })
  @Post('/sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Register new User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthResultDto,
    description: 'User Id',
  })
  @Post('/sign-up')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
