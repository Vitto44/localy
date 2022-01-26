import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './database/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
  ) {}

  async getShops(): Promise<Shop[]> {
    const shops = await this.shopRepository.find();
    return shops;
  }

  async createShop(shop: Shop): Promise<Shop> {
    const res = await this.shopRepository.save(shop);
    return res;
  }

  login(): Object {
    return { name: 'Bobby' };
  }
}
