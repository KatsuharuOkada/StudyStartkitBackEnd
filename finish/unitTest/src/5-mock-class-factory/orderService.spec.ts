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
