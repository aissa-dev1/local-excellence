import { validate } from 'class-validator';
import { singleErrorMessageExceptionFactory } from 'src/pipes/single-error-message.pipe';

export async function validateDto<T extends object>(dto: T) {
  const errors = await validate(dto);

  if (errors.length <= 0) return;

  throw singleErrorMessageExceptionFactory(errors);
}
