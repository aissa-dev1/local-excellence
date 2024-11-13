import { IsMongoId, Length, MinLength } from 'class-validator';

export class CreateSponsorV1Dto {
  @IsMongoId({ message: 'Provide a valid store id' })
  storeId: string;

  @Length(2, 25, { message: 'Background color must be 2-25 characters long' })
  backgroundColor: string;

  @Length(2, 25, { message: 'Color must be 2-25 characters long' })
  color: string;

  @MinLength(2, { message: 'Description must be at least 2 characters long' })
  description: string;
}
