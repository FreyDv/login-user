import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateUserResultDto } from '../user/dto/resualt/create-user-result.dto';
import { FindByEmailType } from '../user/dto/findByEmail.type';

export interface UserForAuthInterface {
  create(createUserDto: CreateUserDto): Promise<CreateUserResultDto>;
  findByEmail(
    email: string,
    shouldReturnPassword?: boolean,
  ): Promise<FindByEmailType>;
}
