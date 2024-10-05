import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreV1 } from './store.schema';
import {
  Model,
  MongooseBaseQueryOptionKeys,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
} from 'mongoose';
import { CreateStoreV1Dto } from './store.dto';
import { StoreV1Document } from './store.types';

@Injectable()
export class StoreServiceV1 {
  constructor(
    @InjectModel(StoreV1.name) private readonly storeModel: Model<StoreV1>,
  ) {}

  async createStore(
    dto: CreateStoreV1Dto,
    ownerId: string,
  ): Promise<StoreV1Document> {
    const createdStore = await this.storeModel.create({
      ownerId,
      ...dto,
    });
    await createdStore.save();
    return createdStore;
  }

  async getShuffledStores(): Promise<StoreV1Document[]> {
    const stores = await this.findAll();

    for (let i = stores.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stores[i], stores[j]] = [stores[j], stores[i]];
    }

    return stores;
  }

  findAll(
    filter?: RootFilterQuery<StoreV1>,
    projection?: ProjectionType<StoreV1>,
    options?: QueryOptions<StoreV1>,
  ): Promise<StoreV1Document[]> {
    return this.storeModel.find(filter, projection, options);
  }

  findOne(
    filter?: RootFilterQuery<StoreV1>,
    projection?: ProjectionType<StoreV1>,
    options?: QueryOptions<StoreV1>,
  ): Promise<StoreV1Document | null> {
    return this.storeModel.findOne(filter, projection, options);
  }

  deleteMany(
    filter?: RootFilterQuery<StoreV1>,
    options?: Pick<QueryOptions<StoreV1>, MongooseBaseQueryOptionKeys> & {
      [other: string]: any;
    },
  ): Promise<{ deletedCount?: number }> {
    return this.storeModel.deleteMany(filter, options);
  }
}
