import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Shop } from './database/shop.entity';
import { Body } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/shop')
  create(@Body() item: Shop): void {
    this.appService.createShop(item);
  }

  @Get('/getShops')
  getShops(): Object {
    return this.appService.getShops();
  }
}
