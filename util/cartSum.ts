// Unit: Test cart sum function in pages/cart.tsx

import { PastaType } from './database';

export function sumAllPrices(allItems: PastaType[]) {
  const summedPrices = allItems.reduce(
    (sum: number, pasta: PastaType) =>
      pasta.quantity && pasta.quantity > 0
        ? sum + pasta.quantity * pasta.price
        : sum,
    0,
  );
  return Math.round(summedPrices + Number.EPSILON) / 100;
}
