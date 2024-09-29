import { IntersectionType } from '@nestjs/swagger/dist/type-helpers/intersection-type.helper';
import { CreateUserDto } from './create-user.dto';
import { CreateUserResultDto } from './resualt/create-user-result.dto';

export class FindByEmailType extends IntersectionType(
  CreateUserDto,
  CreateUserResultDto,
) {}
