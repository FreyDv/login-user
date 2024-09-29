import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './entities/user.model';
import { AuthGuardModule } from '../auth/guard/auth.guard.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), AuthGuardModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
})
export class UserModule {}
