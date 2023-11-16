const BALANCE = 100000; // Assume this is remain of money.
/**
 * Purchase
 */
export const charge = (price: number): boolean => {
  if (price > BALANCE) {
    throw new Error('No have enough money in your wallet');
  }
  return true;
};
/**
 * Decrease quantity in inventory
 */
export const decreaseQuantity = (productId: string, quantity: number) => {
  if (quantity > 3) {
    throw new Error('Must less than 3 items');
  }
  return true;
};

export const buyProduct = (productId: string, price: number, quantity: number): boolean => {
  decreaseQuantity(productId, quantity);
  const amount = price * quantity;
  charge(amount);
  return true;
};
