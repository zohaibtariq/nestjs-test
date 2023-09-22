import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {connect, Connection, Model} from "mongoose";
import { UserDTOStub } from "./dto/user.dto.stub";
import {UsersRepository} from "./users.repository";

describe('UsersService', () => {
  let service: UsersService;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeEach(async () => {
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          UsersService,
          UsersRepository,
        {provide: getModelToken(User.name), useValue: userModel},
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return the saved object", async () => {
    const createdUser = await service.create(UserDTOStub());
    expect(createdUser.username).toBe(UserDTOStub().username);
    expect(createdUser.password).not.toEqual(UserDTOStub().password); // means hashed
  });

});
