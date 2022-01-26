import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from '../database/shop.entity';
import { Session } from '@nestjs/common';
import { ShopDTO } from './shops.dto';
import { AuthService } from '../auth/auth.service';

@Controller('shop')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly authService: AuthService,
  ) {}

  @Get('userShops')
  async findShopByUserId(@Session() session: Record<string, any>) {
    try {
      if ((await this.authService.auth(session)) === 'authenticated') {
        return await this.shopService.findByOwnerId(session.uid);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('userShop')
  async deleteShop(@Session() session: Record<string, any>) {
    try {
      if ((await this.authService.auth(session)) === 'authenticated') {
        return this.shopService.deleteShopByOwnerId(session.uid);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('createShop')
  createShop(@Body() shop: Shop) {
    try {
      return this.shopService.createNewShop(shop);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('/addProducts')
  addProductsToShop(@Body() body: ShopDTO) {
    try {
      return this.shopService.addProductsByShopId(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('/removeProduct')
  removeProductFromShop(@Body() body: ShopDTO) {
    try {
      return this.shopService.removeProductByShopId(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('/search')
  searchShopsByKeyword(@Body() body: { searchTerm: string }) {
    try {
      return this.shopService.findShopsByKeyword(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('/shop')
  addImageToShop(@Body() image: string, session: Record<string, any>) {
    try {
      return this.shopService.addImageToShop(image, session.uid);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
