export function encodeStoreName(name: string): string {
  return name.replaceAll(' ', '-');
}

export function decodeStoreName(name: string): string {
  return name.replaceAll('-', ' ');
}
