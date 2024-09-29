import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './entities/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
})
export class UserModule {}
