const QUANTITY_REMAIN = 10;
class Inventory {
  constructor() {}
  decrease(quantity: number) {
    if (quantity < QUANTITY_REMAIN) {
      throw new Error('Quantity not enough');
    }
    return true;
  }
  increase() {}
}
export { Inventory };
