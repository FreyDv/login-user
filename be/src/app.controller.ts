import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Internal Server Controller')
@Controller()
export class AppController {
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @Get('/ping')
  getHello(): string {
    return `pong_${Date.now()}`;
  }
}
