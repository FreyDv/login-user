import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './entities/user.model';
import { UserForAuthInterface } from '../common/userSearchForAuth.interface';
import { FindByEmailType } from './dto/findByEmail.type';

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

  findByEmail(
    email: string,
    shouldReturnPassword: boolean = false,
  ): Promise<FindByEmailType> {
    const scopedUserModel = shouldReturnPassword
      ? this.userModel.scope('withPassword')
      : this.userModel;

    return scopedUserModel.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<FindByIdUserResultDto> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResultDto> {
    const [affectedCount] = await UserModel.update(updateUserDto, {
      where: { id },
    });
    return affectedCount === 0 ? null : this.findById(id);
  }

  async remove(id: string): Promise<DeleteUserResultDto> {
    const res = await this.userModel.destroy({ where: { id } });
    return { success: res > 0 };
  }
}
