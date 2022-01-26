import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let user;
  let service: UserService;
  beforeEach(async () => {
    user = {
      firstName: 'Bobbyson',
      lastName: 'Szc',
      password: '0000',
      email: 'K@K.Kapa3',
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    await controller.create(user, {});
    expect(service.createUser).toHaveBeenCalled();
  });
});
