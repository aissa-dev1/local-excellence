import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { LANGUAGE_V1 } from 'src/constants';

export function IsLanguage() {
  return applyDecorators(
    IsEnum(LANGUAGE_V1, {
      message: `Language must be one of the following: ${Object.values(
        LANGUAGE_V1,
      ).join(', ')}`,
    }),
  );
}
