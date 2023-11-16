import { buy } from './orderService';
import * as inventory from './inventory';
import { mocked } from 'ts-jest/utils';

const mockInventory = mocked(inventory, true);
jest.mock('./inventory', () => require('./__mocks__/inventory-1'));
describe('Order service', () => {
  beforeAll(() => {
    mockInventory.decrease.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('remain.product.enough', () => {
    // Arrange
    // Act & Assert
  });
  it('remain.product.not.enough', () => {
    // Arrange
    // Act & Assert
  });
});
