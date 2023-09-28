import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { connect, Connection, Model } from 'mongoose';
import { UserDTOStub } from './dto/user.dto.stub';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, { provide: getModelToken(User.name), useValue: userModel }],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createdUser = await service.create(UserDTOStub());
    expect(createdUser.username).toBe(UserDTOStub().username);
    expect(createdUser.password).toEqual(UserDTOStub().password);
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toBeDefined();
    expect(users).toHaveLength(0);
  });

  it('should find a user by ID', async () => {
    const createdUser = await userModel.create(UserDTOStub());
    const user = await service.findById(createdUser._id);
    expect(user).toBeDefined();
    expect(user._id).toEqual(createdUser._id);
  });

  it('should find a user by username', async () => {
    const createdUser = await userModel.create(UserDTOStub());
    const user = await service.findByUsername(UserDTOStub().username);
    expect(user).toBeDefined();
    expect(user.username).toBe(UserDTOStub().username);
  });

  it('should update a user by ID', async () => {
    const createdUser = await userModel.create(UserDTOStub());
    const updatedData = { ...UserDTOStub(), username: 'UpdatedUsername' };
    const updatedUser = await service.update(createdUser._id, updatedData, {new: true});
    expect(updatedUser).toBeDefined();
    expect(updatedUser.username).toBe(updatedData.username);
  });

  it('should remove a user by ID', async () => {
    const createdUser:any = await userModel.create(UserDTOStub());
    const removedUser = await service.remove(createdUser._id);
    expect(removedUser).toBeDefined();
    expect(removedUser._id).toEqual(createdUser._id);
    const userInDatabase = await userModel.findById(createdUser._id);
    expect(userInDatabase).toBeNull();
  });
});
