import * as Color from 'color';

export function isValidCSSColor(color: string): boolean {
  try {
    Color(color);
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}
