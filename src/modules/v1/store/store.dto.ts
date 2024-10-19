import { IsEnum, Length } from 'class-validator';
import { STORE_V1_TYPE } from './store.constants';

export class CreateStoreV1Dto {
  @Length(2, 25, { message: 'Store Name must be 2-25 characters long' })
  name: string;

  @Length(2, 100, { message: 'Description must be 2-100 characters long' })
  description: string;

  @IsEnum(STORE_V1_TYPE, {
    message: `Type must be one of the following: ${Object.values(
      STORE_V1_TYPE,
    ).join(', ')}`,
  })
  type: (typeof STORE_V1_TYPE)[keyof typeof STORE_V1_TYPE];
}
