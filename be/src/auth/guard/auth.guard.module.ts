import { Module } from '@nestjs/common';
import { TokenModule } from '../../common/token/token.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TokenModule],
  controllers: [],
  providers: [AuthGuard],
  exports: [AuthGuard, TokenModule],
})
export class AuthGuardModule {}
