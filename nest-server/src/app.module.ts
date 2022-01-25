import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsController } from './shops/shops.controller';
import { ShopsController } from './shops/shops.controller';

@Module({
  imports: [],
  controllers: [AppController, ShopsController],
  providers: [AppService],
})
export class AppModule {}
