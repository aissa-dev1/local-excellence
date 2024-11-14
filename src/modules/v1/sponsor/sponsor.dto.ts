import { IsMongoId, Length, MinLength } from 'class-validator';
import { IsLanguage } from 'src/decorators/is-language.decorator';
import { TranslationLanguage } from 'src/types/translation';
import { TranslationManager } from 'src/utils/translation-manager';
import { sponsorV1Translation } from './sponsor.translation';

export interface ICreateSponsorV1Dto {
  storeId: string;
  backgroundColor: string;
  color: string;
  description: string;
  language: TranslationLanguage;
}

export class CreateSponsorV1Dto implements ICreateSponsorV1Dto {
  static readonly translation = new TranslationManager({
    translation: sponsorV1Translation,
    language: 'en',
  });

  constructor(dto: ICreateSponsorV1Dto) {
    this.storeId = dto.storeId;
    this.backgroundColor = dto.backgroundColor;
    this.color = dto.color;
    this.description = dto.description;
    this.language = dto.language;
    CreateSponsorV1Dto.translation.setLanguage(this.language);
  }

  @IsMongoId({ message: () => CreateSponsorV1Dto.translation.dtos['store-id'] })
  storeId: string;

  @Length(2, 25, { message: () => CreateSponsorV1Dto.translation.dtos.bg })
  backgroundColor: string;

  @Length(2, 25, { message: () => CreateSponsorV1Dto.translation.dtos.color })
  color: string;

  @MinLength(2, {
    message: () => CreateSponsorV1Dto.translation.dtos.description,
  })
  description: string;

  @IsLanguage()
  language: TranslationLanguage;
}
