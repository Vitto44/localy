import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('Users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/login')
  login(): Object {
    return this.appService.login();
  }
}
