export interface IRate {
  base: string;
  rates: { [currency: string]: number };
}
