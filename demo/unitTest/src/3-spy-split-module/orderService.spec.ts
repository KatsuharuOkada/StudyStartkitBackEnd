import { buy } from './orderService';
import * as inventory from './inventory';

describe('OrderService.order.success', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeAll(() => {});
  it('Remain.product.success', () => {
    // Arrange
    const quantity = 10;

    // Act & Assert
  });
});

describe('OrderService.order.fail', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  let spyDecrease = jest.spyOn(inventory, 'decrease').mockImplementationOnce(() => false);
  it('remain.product.fail', () => {
    // Arrange
    // Act & Assert
  });
});
