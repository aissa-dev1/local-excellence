import { Document } from 'mongoose';
import { StoreV1 } from './store.schema';
import { STORE_V1_TYPE } from './store.constants';

export type StoreV1Document = StoreV1 & Document;

export type StoreV1Type = (typeof STORE_V1_TYPE)[keyof typeof STORE_V1_TYPE];
