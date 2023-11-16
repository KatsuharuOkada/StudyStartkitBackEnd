const QUANTITY_REMAIN = 5;
import { Inventory } from './inventory';
class OrderService {
  productIds: string[];
  inventory: Inventory;
  constructor() {
    this.inventory = new Inventory();
  }
  add(quantity: number) {
    console.log('Call add func real');
    this.inventory.decrease(quantity);
  }
}

export { OrderService };
