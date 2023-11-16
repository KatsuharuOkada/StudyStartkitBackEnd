import { decrease } from './inventory';
function buy(quantity: number) {
  if (decrease(quantity)) {
    return true;
  }
  return false;
}
export { buy };
