import { IsEnum, Length } from 'class-validator';
import { STORE_V1_TYPE } from './store.constants';
import { StoreV1Type } from './store.types';
import { TranslationManager } from 'src/utils/translation-manager';
import { storeV1Translation } from './store.translation';
import { TranslationLanguage } from 'src/types/translation';
import { IsLanguage } from 'src/decorators/is-language.decorator';

export interface ICreateStoreV1Dto {
  name: string;
  description: string;
  type: StoreV1Type;
  language: TranslationLanguage;
}

export class CreateStoreV1Dto implements ICreateStoreV1Dto {
  static readonly translation = new TranslationManager({
    translation: storeV1Translation,
    language: 'en',
  });

  constructor(dto: ICreateStoreV1Dto) {
    this.name = dto.name;
    this.description = dto.description;
    this.type = dto.type;
    this.language = dto.language;
    CreateStoreV1Dto.translation.setLanguage(this.language);
  }

  @Length(2, 25, { message: () => CreateStoreV1Dto.translation.dtos.name })
  name: string;

  @Length(2, 100, {
    message: () => CreateStoreV1Dto.translation.dtos.description,
  })
  description: string;

  @IsEnum(STORE_V1_TYPE, {
    message: () =>
      `${CreateStoreV1Dto.translation.dtos.type} ${Object.values(
        STORE_V1_TYPE,
      ).join(', ')}`,
  })
  type: StoreV1Type;

  @IsLanguage()
  language: TranslationLanguage;
}
