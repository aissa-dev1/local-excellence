import { Document } from 'mongoose';
import { UserV1 } from './user.schema';

export interface JWTUserV1Type {
  sub: string;
  email: string;
  userName: string;
}

export type UserV1Document = UserV1 & Document;
