import { Document } from 'mongoose';
import { ProductV1 } from './product.schema';

export type ProductV1Document = ProductV1 & Document;
