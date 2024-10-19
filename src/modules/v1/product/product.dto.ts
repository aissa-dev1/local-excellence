import { IsInt, IsMongoId, Length, Min } from 'class-validator';

export class CreateProductV1Dto {
  @IsMongoId({ message: 'Provide a valid store id' })
  storeId: string;

  @Length(2, 25, { message: 'Product Name must be 2-25 characters long' })
  name: string;

  @Length(2, 100, { message: 'Description must be 2-100 characters long' })
  description: string;

  @IsInt({ message: 'Price must be an integer value (DZD)' })
  @Min(10, { message: 'Price must be at least 10 DZD' })
  price: number;
}
