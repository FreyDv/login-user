import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindByIdUserResultDto } from './dto/resualt/find-by-id-user-result.dto';
import { UpdateUserResultDto } from './dto/resualt/update-user-result.dto';
import { DeleteUserResultDto } from './dto/resualt/delete-user-result.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindByIdUserResultDto,
    description: 'User Id',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<FindByIdUserResultDto> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateUserResultDto,
    description: 'User Id',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResultDto> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteUserResultDto,
    description: 'User Id',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteUserResultDto> {
    return this.userService.remove(id);
  }
}
