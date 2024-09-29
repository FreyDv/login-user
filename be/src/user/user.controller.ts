import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResultDto } from './dto/create-user-result.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserResultDto,
    description: 'User Id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserResultDto,
    description: 'User Id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserResultDto,
    description: 'User Id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
