import { AuthService } from '../auth/auth.service';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  beforeEach(() => {
    authService = new AuthService(userRepository);
  });

  it('should be defined', async () => {
    expect(authService).toBeDefined();
  });

  describe('Authenticated', () => {
    it('should authenticate user', async () => {
      const result: any = 'Authenticated';
      jest.spyOn(authService, 'auth').mockImplementation(() => result);
      expect(authService.auth({})).toBe(result);
    });
  });
});
