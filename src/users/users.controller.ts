import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DuplicateKeyExceptionFilter } from '../exceptions/duplicate-key.filter';
import { ObjectId } from "mongoose";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(DuplicateKeyExceptionFilter)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}