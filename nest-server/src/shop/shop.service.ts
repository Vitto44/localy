import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Like, Raw } from 'typeorm';
import { Shop } from '../database/shop.entity';
import { ShopDTO } from './shops.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
  ) {}

  async createNewShop(shop: Shop, session: any): Promise<Shop> {
    const products = [shop.products];
    const newShop = { ...shop, ownerId: session.uid, products: [] };

    const shopando = await this.shopRepository.save(newShop);
    const { id } = shopando;
    await this.addProductsByShopId({ products, id });
    return shopando;
  }

  async deleteShopByOwnerId(shopId: string): Promise<Shop> {
    const targetShop = await this.shopRepository.findOne({ id: shopId });
    await this.shopRepository.delete({ id: shopId });
    return targetShop;
  }

  async findByOwnerId(id: string): Promise<Shop[]> {
    return await this.shopRepository.find({ ownerId: id });
  }

  async addProductsByShopId(body: any): Promise<string[]> {
    // destructure body of the request
    const { products, id } = body;

    // declare some helper variables
    const oldProducts = (await this.shopRepository.findOne({ id: id }))
      .products;
    const productAlreadyExists =
      oldProducts &&
      products.some((item: string) => oldProducts.includes(item));

    // conditionally query the database
    if (!productAlreadyExists) {
      await this.shopRepository
        .createQueryBuilder()
        .update(Shop)
        .set({ products: [...oldProducts, ...products] })
        .where({ id: id })
        .execute();
      // return the new products array for the backend
      return (await this.shopRepository.findOne({ id: id })).products;
    } else if (productAlreadyExists) {
      throw new Error();
    } else {
      await this.shopRepository
        .createQueryBuilder()
        .update(Shop)
        .set({ products: [...products] })
        .where({ id: id })
        .execute();
      // return the new products array for the backend
      return (await this.shopRepository.findOne({ id: id })).products;
    }
  }

  async removeProductByShopId(body: ShopDTO): Promise<string[]> {
    // destructure body of the request
    const { products, id } = body;

    // declare some helper variables
    const oldProducts = (await this.shopRepository.findOne({ id: id }))
      .products;
    const newProducts = oldProducts.filter((item) => !products.includes(item));

    // send the remove query to database
    await this.shopRepository
      .createQueryBuilder()
      .update(Shop)
      .set({ products: newProducts })
      .where({ id: id })
      .execute();

    // we want the new products array back for the frontend
    return (await this.shopRepository.findOne({ id: id })).products;
  }

  async findShopsByKeyword(body: { searchTerm: string }): Promise<Shop[]> {
    const { searchTerm } = body;
    const shops = await this.shopRepository.find({
      name: Like(`%${searchTerm}%`),
    });
    const products = await this.shopRepository.query(
      ' SELECT * FROM "shop" ' + ' where "products" @> ARRAY[$1] ',
      [searchTerm],
    );

    return products;
  }

  async addImageToShop(image: string, id: string): Promise<string[]> {
    const shop = await this.shopRepository.findOne({ id: id });

    await this.shopRepository
      .createQueryBuilder()
      .update(Shop)
      .set({ pictures: [...shop.pictures, image] })
      .where({ id: id })
      .execute();
    // return the new pictures array for the backend
    return (await this.shopRepository.findOne({ id: id })).pictures;
  }
}
