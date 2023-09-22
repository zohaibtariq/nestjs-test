import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { APP_FILTER } from "@nestjs/core";
import { DuplicateKeyExceptionFilter } from "../exceptions/duplicate-key.filter";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
      UsersRepository,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyExceptionFilter,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
