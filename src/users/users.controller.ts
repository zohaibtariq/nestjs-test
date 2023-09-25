import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from './../common/guards/accessToken.guard';
import { ObjectId, Types } from "mongoose";

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll({}, {refreshToken: 0, password: 0});
  }

  @Get(':id')
  findById(@Param('id') id: Types.ObjectId) {
    return this.usersService.findById(id, {refreshToken: 0, password: 0});
  }

  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto, { new: true });
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}
