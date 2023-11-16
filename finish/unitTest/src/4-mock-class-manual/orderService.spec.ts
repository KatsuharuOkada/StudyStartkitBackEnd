import { OrderService } from './orderService';
import { Inventory } from './inventory';
import { mocked } from 'ts-jest/utils';
import { mockDecreaseFunc } from './__mocks__/inventory';

jest.mock('./inventory', () => require('./__mocks__/inventory'));
const MockInventory = mocked(Inventory, true);
describe('OrderService.add.', () => {
  beforeEach(() => {});
  it('add.success', () => {
    // Arrange
    const orderService = new OrderService();
    const quantity = 3;

    // Act
    orderService.add(quantity);

    // Assert
    expect(mockDecreaseFunc).toHaveBeenCalled();
    expect(mockDecreaseFunc).toHaveBeenCalledWith(quantity);
    expect(mockDecreaseFunc).toHaveBeenCalledTimes(1);
  });

  it('add.fail', () => {
    // Arrange
    const orderService = new OrderService();
    const quantity = 3;

    // Act
    expect(() => {
      orderService.add(quantity);
    }).toThrowError();

    // Assert
    expect(mockDecreaseFunc).toHaveBeenCalled();
    expect(mockDecreaseFunc).toHaveBeenCalledWith(quantity);
    expect(mockDecreaseFunc).toHaveBeenCalledTimes(2);
  });
});
