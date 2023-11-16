const QUANTITY_REMAIN = 5;
export function decrease(quantity: number) {
  if (quantity > QUANTITY_REMAIN) {
    return false;
  }
  return true;
}
