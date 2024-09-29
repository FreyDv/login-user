import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResultDto {
  @ApiProperty({
    description: 'Deleting result',
    example: true,
  })
  success: boolean;
}
