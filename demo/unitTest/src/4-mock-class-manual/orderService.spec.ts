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
    // Act
    // Assert
  });

  it('add.fail', () => {
    // Arrange
    // Act
    // Assert
  });
});
