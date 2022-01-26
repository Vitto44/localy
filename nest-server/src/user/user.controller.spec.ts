import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;
  let userRepository: Repository<User>;
  let user;
  beforeEach(() => {
    userService = new UserService(userRepository);
    userController = new UserController(userService, authService);
    user = {
      email: 's@s.s',
      firstName: 'me',
      id: 'meme',
    };
  });

  it('should be defined', async () => {
    expect(userController).toBeDefined();
  });

  describe('Create', () => {
    it('should create a user', async () => {
      const result = user;
      jest.spyOn(userService, 'createUser').mockImplementation(() => result);
      expect(userController.create(user, {})).toBe(result);
    });
  });

  describe('Login', () => {
    it('should login user', async () => {
      const result = user;
      jest.spyOn(userService, 'login').mockImplementation(() => result);
      expect(userController.login(user, {})).toBe(result);
    });
  });
});
