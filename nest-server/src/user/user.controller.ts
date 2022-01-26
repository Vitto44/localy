import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../database/user.entity';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  create(
    @Body() user: User,
    @Session() session: Record<string, any>,
  ): Promise<{ email: string; firstName: string; id: string }> {
    try {
      return this.userService.createUser(user, session);
    } catch (error) {}
  }

  @Post('login')
  login(
    @Body() user: User,
    @Session() session: Record<string, any>,
  ): Promise<{ email: string; firstName: string; id: string }> {
    try {
      return this.userService.login(user, session);
    } catch (error) {}
  }

  @Delete('delete')
  async delete(@Body() user: User, @Session() session: Record<string, any>) {
    try {
      if ((await this.authService.auth(session)) === 'authenticated') {
        this.userService.delete(user, session);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new ForbiddenException(
        "It better be right next time! Otherwise I'm going for them knees",
      );
    }
  }

  @Get('authenticated')
  async AuthTest(@Session() session: Record<string, any>): Promise<string> {
    try {
      return await this.authService.auth(session);
    } catch (error) {
      throw new BadRequestException('Invalid user');
    }
  }

  @Get('logout')
  async logout(@Session() session: Record<string, any>) {
    try {
      if ((await this.authService.auth(session)) === 'authenticated') {
        return this.userService.logout(session);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException('Forbidden stuff');
    }
  }
}
