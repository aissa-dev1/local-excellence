import { IsInt, IsMongoId, Length, Min } from 'class-validator';
import { IsLanguage } from 'src/decorators/is-language.decorator';
import { TranslationLanguage } from 'src/types/translation';
import { TranslationManager } from 'src/utils/translation-manager';
import { productV1Translation } from './product.translation';

export interface ICreateProductV1Dto {
  storeId: string;
  name: string;
  description: string;
  price: number;
  language: TranslationLanguage;
}

export class CreateProductV1Dto implements ICreateProductV1Dto {
  static readonly translation = new TranslationManager({
    translation: productV1Translation,
    language: 'en',
  });

  constructor(dto: ICreateProductV1Dto) {
    this.storeId = dto.storeId;
    this.name = dto.name;
    this.description = dto.description;
    this.price = dto.price;
    this.language = dto.language;
    CreateProductV1Dto.translation.setLanguage(this.language);
  }

  @IsMongoId({ message: () => CreateProductV1Dto.translation.dtos['store-id'] })
  storeId: string;

  @Length(2, 25, { message: () => CreateProductV1Dto.translation.dtos.name })
  name: string;

  @Length(2, 100, {
    message: () => CreateProductV1Dto.translation.dtos.description,
  })
  description: string;

  @IsInt({ message: () => CreateProductV1Dto.translation.dtos['price-int'] })
  @Min(10, { message: () => CreateProductV1Dto.translation.dtos['price-min'] })
  price: number;

  @IsLanguage()
  language: TranslationLanguage;
}
