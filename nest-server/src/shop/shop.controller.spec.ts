import { AuthService } from '../auth/auth.service';
import { Shop } from 'src/database/shop.entity';
import { Repository } from 'typeorm';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

describe('ShopController', () => {
  let shopController: ShopController;
  let shopService: ShopService;
  let authService: AuthService;
  let shopRepository: Repository<Shop>;
  let shop;
  beforeEach(() => {
    shopService = new ShopService(shopRepository);
    shopController = new ShopController(shopService, authService);
    shop = {
      name: 'a one shop',
      latitude: 45.5,
      longitude: 2.1,
    };
  });

  it('should be defined', async () => {
    expect(shopController).toBeDefined();
  });

  describe('Create shop', () => {
    it('should create a new shop', async () => {
      const result = shop;
      jest.spyOn(shopService, 'createNewShop').mockImplementation(() => result);
      expect(shopController.createShop(shop, {})).toBe(result);
    });
  });

  // describe('Delete shop', () => {
  //   it('should delete shop by owner id', async () => {
  //     const result = shop;
  //     jest
  //       .spyOn(shopService, 'deleteShopByOwnerId')
  //       .mockImplementation(() => result);
  //     expect(shopController.deleteShop(shop, {})).toBe(result);
  //   });
  // });
});
