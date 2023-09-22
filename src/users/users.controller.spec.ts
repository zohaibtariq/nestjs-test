import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserDTOStub } from "./dto/user.dto.stub";
import {UsersRepository} from "./users.repository";

describe("UsersController", () => {

  let controller: UsersController;
  let mongoConnection: Connection;

  let userModel: Model<User>;

  beforeAll(async () => {
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {provide: getModelToken(User.name), useValue: userModel},
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  // afterAll(async () => { // no need globalSetupFile is already watching for it
  //   await mongoConnection.dropDatabase();
  //   await mongoConnection.close();
  // });

  beforeEach(async () => {
    //
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('UsersController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should return the saved object", async () => {
    const createdUser = await controller.create(UserDTOStub());
    expect(createdUser.username).toBe(UserDTOStub().username);
  });

});