import { buy } from './orderService';
import * as inventory from './inventory';

describe('OrderService.order.success', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  let spyDecrease = jest.spyOn(inventory, 'decrease').mockImplementationOnce(() => true);
  beforeAll(() => {});
  it('Remain.product.success', () => {
    // Arrange
    const quantity = 10;

    // Act & Assert
    expect(buy(quantity)).toBeTruthy();
    expect(spyDecrease).toHaveBeenCalledTimes(1);
  });
});

describe('OrderService.order.fail', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  let spyDecrease = jest.spyOn(inventory, 'decrease').mockImplementationOnce(() => false);
  it('remain.product.fail', () => {
    const quantity = 10;
    // Arrange

    // Act & Assert
    expect(buy(quantity)).toBeFalsy();
    expect(spyDecrease).toHaveBeenCalledTimes(1);
  });
});
