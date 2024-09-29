import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './entities/user.model';
import { UserForAuthInterface } from '../common/userSearchForAuth.interface';
import { CreateUserResultDto } from './dto/create-user-result.dto';

@Injectable()
export class UserService implements UserForAuthInterface {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { id } = await this.userModel.create(createUserDto);
    return { id };
  }

  findByEmailWithPassword(email: string): Promise<CreateUserResultDto> {
    return this.userModel.scope('withPassword').findOne({
      where: {
        email,
      },
    });
  }

  findById(id: string) {
    return this.userModel.findByPk(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: string) {
    return this.userModel.destroy({ where: { id } });
  }
}
