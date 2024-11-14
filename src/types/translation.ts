import { LANGUAGE_V1 } from 'src/constants';

export type TranslationLanguage =
  (typeof LANGUAGE_V1)[keyof typeof LANGUAGE_V1];

export type TranslationType<T extends Record<string, any>> = {
  [K in TranslationLanguage]: T;
};

export type TranslationStructureType<
  E extends Record<string, any>,
  M extends Record<string, any>,
  D extends Record<string, any>,
> = {
  readonly errors: Readonly<E>;
  readonly messages: Readonly<M>;
  readonly dtos: Readonly<D>;
};

export type TranslationStructure<
  E extends Record<string, any>,
  M extends Record<string, any>,
  D extends Record<string, any>,
> = TranslationType<TranslationStructureType<E, M, D>>;
