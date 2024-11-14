import {
  TranslationLanguage,
  TranslationStructure,
} from 'src/types/translation';

interface TranslationManagerConfig<E, M, D> {
  translation: TranslationStructure<E, M, D>;
  language: TranslationLanguage;
}

export class TranslationManager<E, M, D> {
  private translation: TranslationStructure<E, M, D>;
  private language: TranslationLanguage;

  constructor(config: TranslationManagerConfig<E, M, D>) {
    this.translation = config.translation;
    this.language = config.language;
  }

  setLanguage(language: TranslationLanguage) {
    this.language = language;
  }

  get errors(): E {
    return this.translation[this.language].errors;
  }

  get messages(): M {
    return this.translation[this.language].messages;
  }

  get dtos(): D {
    return this.translation[this.language].dtos;
  }
}
