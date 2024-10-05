import { Document } from 'mongoose';
import { StoreV1 } from './store.schema';

export enum StoreV1Type {
  CLOTHES = 'clothes',
  FOOD = 'food',
  TECHNOLOGY = 'technology',
}

export type StoreV1Document = StoreV1 & Document;

export type StoreV1WithId = StoreV1 & { _id: unknown };
