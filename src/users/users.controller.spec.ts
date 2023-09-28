import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {Connection, connect, Model, ObjectId} from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from "./users.repository";

describe('UsersController', () => {

  let controller: UsersController;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersRepository,
        UsersService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('UsersController should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const testUsers = [
        { name: 'TestUser1', username: 'testuserviprand1', password: 'hello123' },
        { name: 'TestUser2', username: 'testuserviprand2', password: 'hello123' }
      ];
      await userModel.insertMany(testUsers);
      const users = await controller.findAll();
      expect(users).toHaveLength(testUsers.length);
      expect(users[0].name).toBe(testUsers[0].name);
      expect(users[1].name).toBe(testUsers[1].name);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const testUser = { name: 'TestUser', username: 'testuserviprand2', password: 'hello123' };
      const createdUser = await userModel.create(testUser);
      const user = await controller.findById(createdUser._id);
      expect(user._id).toEqual(createdUser._id);
      expect(user.name).toBe(createdUser.name);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const testUser = { name: 'TestUser', username: 'testuserviprand2', password: 'hello123' };
      const createdUser = await userModel.create(testUser);
      const updatedUserData = { name: 'UpdatedUser' };
      const updatedUser = await controller.update(createdUser._id, updatedUserData);
      expect(updatedUser._id).toEqual(createdUser._id);
      expect(updatedUser.name).toBe(updatedUserData.name);
    });

    it('should handle errors when updating a user', async () => {
      const invalidUserId: any = '651041a6de53df30e0a07dd7';
      const updatedUserData = { name: 'UpdatedUser' };

      try {
        await controller.update(invalidUserId, updatedUserData);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const testUser = { name: 'TestUser', username: 'testuserviprand2', password: 'hello123' };
      const createdUser: any = await userModel.create(testUser);
      const removedUser = await controller.remove(createdUser._id);
      expect(removedUser._id).toEqual(createdUser._id);
      expect(removedUser.name).toBe(createdUser.name);
      const userInDatabase = await userModel.findById(createdUser._id);
      expect(userInDatabase).toBeNull();
    });

    it('should handle errors when removing a user', async () => {
      const invalidUserId: any = '651041a6de53df30e0a07dd7';
      try {
        await controller.remove(invalidUserId);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

});
