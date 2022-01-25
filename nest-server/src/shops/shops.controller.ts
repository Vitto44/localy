import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
}
