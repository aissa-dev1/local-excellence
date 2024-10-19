import { Document } from 'mongoose';
import { StoreV1 } from './store.schema';

export type StoreV1Document = StoreV1 & Document;
