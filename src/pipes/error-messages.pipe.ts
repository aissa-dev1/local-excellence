import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';

export function errorMessagesExceptionFactory(errors: ValidationError[]) {
  const messages = errors.map((error) => {
    const constraints = Object.values(error.constraints || {});
    return `${error.property}: ${constraints[0]}`;
  });
  return new BadRequestException(messages.join(', '));
}

export const errorMessagesValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: errorMessagesExceptionFactory,
});
