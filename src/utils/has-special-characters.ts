export function hasSpecialCharacters(input: string): boolean {
  const specialCharsRegex = /[^a-zA-Z0-9\s]/g;
  return specialCharsRegex.test(input);
}
