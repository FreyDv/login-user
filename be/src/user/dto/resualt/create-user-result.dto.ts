import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResultDto {
  @ApiProperty({
    description: 'User Id',
    example: 'ebb26cc1-e13e-40e6-935f-9bf5682a338c',
    type: 'string',
  })
  id: string;
}
