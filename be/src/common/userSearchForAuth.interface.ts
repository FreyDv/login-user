import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateUserResultDto } from '../user/dto/create-user-result.dto';

export interface UserForAuthInterface {
  create(createUserDto: CreateUserDto): Promise<CreateUserResultDto>;
  findByEmailWithPassword(email: string): Promise<CreateUserResultDto>;
}
