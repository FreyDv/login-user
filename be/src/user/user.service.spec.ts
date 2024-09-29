import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/sequelize';
import { UserModel } from './entities/user.model';

const testUserModel = {
  id: '',
  email: '',
  name: '',
  secondName: '',
  birthDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(UserModel),
          useValue: {
            create: jest.fn(() => [testUserModel]),
            findOne: jest.fn(() => [testUserModel]),
            findByPk: jest.fn(() => [testUserModel]),
            update: jest.fn(() => [testUserModel]),
            destroy: jest.fn(() => 1),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //TODO cover UserService method by unit test
});
