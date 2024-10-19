import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreV1 } from './store.schema';
import { Model } from 'mongoose';
import { CreateStoreV1Dto } from './store.dto';
import { StoreV1Document } from './store.types';
import {
  DBQueryDeleteParams,
  DBQueryFindParams,
} from 'src/modules/shared/types';

@Injectable()
export class StoreServiceV1 {
  private shuffledStores: StoreV1Document[] = [];
  private lastShuffleTime: number = 0;
  private shuffleInterval: number = 1000 * 60;

  constructor(
    @InjectModel(StoreV1.name) private readonly storeModel: Model<StoreV1>,
  ) {}

  async createStore(
    dto: CreateStoreV1Dto,
    userId: string,
  ): Promise<StoreV1Document> {
    const createdStore = await this.storeModel.create({
      userId,
      ...dto,
      createdAt: Date.now(),
    });
    await createdStore.save();
    return createdStore;
  }

  async getPaginatedStores(
    page: number,
    limit: number,
  ): Promise<StoreV1Document[]> {
    if (
      Date.now() - this.lastShuffleTime > this.shuffleInterval ||
      this.shuffledStores.length === 0
    ) {
      await this.shuffleStores();
    }
    const start = (page - 1) * limit;
    const end = page * limit;
    return this.shuffledStores.slice(start, end);
  }

  async getRandomStores(): Promise<StoreV1Document[]> {
    const stores = await this.findMany();

    for (let i = stores.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stores[i], stores[j]] = [stores[j], stores[i]];
    }

    return stores;
  }

  private async shuffleStores() {
    const stores = await this.findMany();
    this.shuffledStores = stores.sort(() => Math.random() - 0.5);
    this.lastShuffleTime = Date.now();
  }

  findMany(
    params: DBQueryFindParams<StoreV1> = {},
  ): Promise<StoreV1Document[]> {
    return this.storeModel.find(
      params.filter,
      params.projection,
      params.options,
    );
  }

  findOne(
    params: DBQueryFindParams<StoreV1> = {},
  ): Promise<StoreV1Document | null> {
    return this.storeModel.findOne(
      params.filter,
      params.projection,
      params.options,
    );
  }

  deleteMany(
    params: DBQueryDeleteParams<StoreV1> = {},
  ): Promise<{ deletedCount?: number }> {
    return this.storeModel.deleteMany(params.filter, params.options);
  }
}
