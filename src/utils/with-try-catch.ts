import { AsyncFunc } from 'src/types/async-func';

export async function withTryCatch<T>(
  fn: AsyncFunc<T>,
  ...args: any[]
): Promise<[T | null, any | null]> {
  try {
    const result = await fn(...args);
    return [result, null];
  } catch (error) {
    return [null, error as any];
  }
}
