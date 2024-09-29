import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../create-user.dto';
import { IntersectionType } from '@nestjs/swagger/dist/type-helpers/intersection-type.helper';
import { CreateUserResultDto } from './create-user-result.dto';

export class FindByIdUserResultDto extends IntersectionType(
  OmitType(CreateUserDto, ['password']),
  CreateUserResultDto,
) {}
