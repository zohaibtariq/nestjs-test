import { Injectable } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
      private readonly usersRepository: UsersRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(filter = {}, projection = {}): Promise<UserDocument[]> {
    return this.usersRepository.find(filter, projection);
  }

  async findById(id: Types.ObjectId, projection = {}): Promise<UserDocument> {
    return this.usersRepository.findById(id, projection);
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.usersRepository.findOne({ username });
  }

  async update(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
    options = {}
  ): Promise<UserDocument> {
    return this.usersRepository.findByIdAndUpdate(id, updateUserDto, options);
  }

  async remove(id: ObjectId): Promise<UserDocument> {
    return this.usersRepository.findByIdAndDelete(id);
  }
}
