import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthResultDto } from './dto/auth-result.dto';
import { TokenService } from '../common/token/token.service';
import { PasswordService } from '../common/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResultDto> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      user.password,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.tokenService.sign({ userId: user.id });

    return { accessToken };
  }

  async register(registerDto: RegisterDto): Promise<AuthResultDto> {
    const userWithSameEmail = await this.userService.findByEmail(
      registerDto.email,
    );

    if (userWithSameEmail) {
      throw new ConflictException('User with same email already registered');
    }

    registerDto.password = await this.passwordService.hashPassword(
      registerDto.password,
    );

    const user = await this.userService.create(registerDto);

    const accessToken = await this.tokenService.sign({ userId: user.id });

    return { accessToken };
  }
}
