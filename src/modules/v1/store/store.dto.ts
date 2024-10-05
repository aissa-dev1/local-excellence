import { IsEnum, Length } from 'class-validator';
import { StoreV1Type } from './store.types';

export class CreateStoreV1Dto {
  @Length(2, 25, { message: 'Store Name must be 2-25 characters long' })
  name: string;

  @IsEnum(StoreV1Type, {
    message: 'Type must be one of the following: music, clothes',
  })
  type: StoreV1Type;
}
