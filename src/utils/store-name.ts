export function encodeStoreName(name: string): string {
  if (typeof name !== 'string') return '';

  return name.replaceAll(' ', '-');
}

export function decodeStoreName(name: string): string {
  if (typeof name !== 'string') return '';

  return name.replaceAll('-', ' ');
}
