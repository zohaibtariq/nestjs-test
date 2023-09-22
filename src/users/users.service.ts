import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId} from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

  constructor(
      private readonly usersRepository: UsersRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.usersRepository.find({}, {password: 0});
  }

  findOne(id: ObjectId) {
    return this.usersRepository.findById(id, {password: 0});
  }

  async update(
      id: ObjectId,
      updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    let obj = {...updateUserDto};
    if(updateUserDto.password){
      const hashedPass = await bcrypt.hash(updateUserDto.password, 10)
      obj = {...obj, "password": hashedPass}
    }
    return this.usersRepository.findByIdAndUpdate(id, obj, {new: true});
  }

  async remove(id: ObjectId) {
    return this.usersRepository.findByIdAndRemove(id);
  }

}
