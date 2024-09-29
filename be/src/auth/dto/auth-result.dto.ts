import { ApiProperty } from '@nestjs/swagger';

export class AuthResultDto {
  @ApiProperty({
    description: 'User Token to access api',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYmIyNmNjMS1lMTNlLTQwZTYtOTM1Zi05YmY1NjgyYTMzOGMiLCJpYXQiOjE1MTYyMzkwMjJ9.8w8zXFQf9ThFBbNdXm-UPv6chlEL3cdjmS9mouEkG3A',
    type: 'string',
  })
  accessToken: string;
}
