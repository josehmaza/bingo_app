export class BingoUtil {
  static isInRange(number: number, min: number, max: number): boolean {
    return number >= min && number <= max;
  }
}