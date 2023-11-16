import { OrderService } from './orderService';

let mockDecreaseFunc = jest
  .fn()
  .mockImplementationOnce(() => {
    console.log('#Mock.Inventory.decrease');
    return true;
  })
  .mockImplementationOnce(() => {
    throw new Error('Throw.Error');
  });
jest.mock('./inventory', () => {
  return {
    Inventory: jest.fn().mockImplementation(() => {
      return {
        decrease: mockDecreaseFunc,
      };
    }),
  };
});

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
