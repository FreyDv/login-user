import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
