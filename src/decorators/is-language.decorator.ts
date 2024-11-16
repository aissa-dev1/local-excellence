import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { SUPPORTED_LANGUAGES } from 'src/constants';

export function IsLanguage() {
  return applyDecorators(
    IsEnum(SUPPORTED_LANGUAGES, {
      message: `Language must be one of the following: ${Object.values(
        SUPPORTED_LANGUAGES,
      ).join(', ')}`,
    }),
  );
}
