import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async auth(session: Record<string, any>): Promise<string> {
    try {
      const { uid } = session;
      if (!uid) {
        throw new Error();
      }
      const account = await this.userRepository.findOne({ id: uid });
      if (!account) {
        throw new Error();
      } else {
        return 'authenticated';
      }
    } catch (error) {
      return 'Not authenticated';
    }
  }
}
