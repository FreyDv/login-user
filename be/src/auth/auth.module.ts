import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from '../common/token/token.module';
import { PasswordModule } from '../common/password/password.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TokenModule, PasswordModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
