import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './database/shop.entity';
import { User } from './database/user.entity';
import config from './ormconfig';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ShopService } from './shop/shop.service';
import { ShopController } from './shop/shop.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Shop, User]),
  ],
  controllers: [UserController, ShopController],
  providers: [UserService, ShopService, AuthService],
})
export class AppModule {}
