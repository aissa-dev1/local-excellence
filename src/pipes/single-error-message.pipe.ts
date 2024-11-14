import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';

export function singleErrorMessageExceptionFactory(errors: ValidationError[]) {
  const message = errors.map((error) => Object.values(error.constraints)[0])[0];
  return new BadRequestException(message);
}

export const singleErrorMessageValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  stopAtFirstError: true,
  exceptionFactory: singleErrorMessageExceptionFactory,
});
