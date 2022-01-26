import {
  ForbiddenException,
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  ////////////////////////////////////////////
  async createUser(
    user: User,
    session: Record<string, any>,
  ): Promise<{ email: string; firstName: string; id: string }> {
    //
    const account = await this.userRepository.findOne({ email: user.email });
    if (account) {
      throw new ConflictException(null, 'Invalid...stuff! Fix Stuff!');
    }
    const hash = await bcrypt.hash(user.password, 10);
    const acc = await this.userRepository.save({ ...user, password: hash });
    session.uid = acc.id;

    const { email, firstName, id } = acc;

    return { email, firstName, id };
  }
  ////////////////////////////////////////////
  async login(
    user: User,
    session: Record<string, any>,
  ): Promise<{ email: string; firstName: string; id: string }> {
    const account = await this.userRepository.findOne({ email: user.email });
    if (!account) {
      throw new NotFoundException(null, 'New around here?');
    }
    const { password, email, firstName, id } = account;
    if (!(await bcrypt.compare(user.password, account.password))) {
      throw new ForbiddenException(null, "That ain't it chief!");
    }
    session.uid = account.id;

    return { email, firstName, id };
  }
  ////////////////////////////////////////////
  async delete(user: User, session: Record<string, any>): Promise<string> {
    const account = await this.userRepository.findOne({ email: user.email });

    if (!account) {
      throw new NotFoundException("Welp, he's not there.");
    }
    if ((await session.uid) !== account.id) {
      throw new UnauthorizedException(
        null,
        'Hippity Hoppity, this is not your property.',
      );
    }
    if (!(await bcrypt.compare(user.password, account.password))) {
      throw new ForbiddenException(
        "It better be right next time, otherwise I'm going for the knees!",
      );
    }

    await this.userRepository.delete;
    ({ id: account.id });

    return 'User Deleted!';
  }
  //////////////////////////////////////////
  async logout(session: Record<string, any>): Promise<string> {
    session.destroy();
    return 'Succesfully Logged out';
  }
}
