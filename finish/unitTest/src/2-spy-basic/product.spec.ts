import * as product from './product';

describe('buyProduct', () => {
  let spyChargeFunc = jest.spyOn(product, 'charge').mockImplementation(() => true);
  let spyInventoryFunc = jest.spyOn(product, 'decreaseQuantity').mockImplementation(() => true);
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('buyProduct.should.be.success', () => {
    // Arrange
    const price = 20000;
    const quantity = 10;
    const amount = 20000 * 10;
    // Act
    const buyProductResult = product.buyProduct('Heineken', price, quantity);

    // Assert
    expect(buyProductResult).toBeTruthy();
    expect(spyChargeFunc).toHaveBeenCalled();
    expect(spyChargeFunc).toHaveBeenCalledTimes(1);
    expect(spyChargeFunc).toHaveBeenCalledWith(amount);
    expect(spyInventoryFunc).toHaveBeenCalled();
  });
});

describe('charge', () => {
  afterAll(() => {});

  it('charge.should.be.success', () => {
    // Arrange
    const price = 20000;

    // Act
    const buyProductResult = product.charge(price);

    // Assert
    expect(buyProductResult).toBeTruthy();
  });

  it('charge.should.be.fail', () => {
    // Arrange
    const price = 110000;

    // Act & Assert
    expect(() => {
      product.charge(price);
    }).toThrowError(/No have enough money in your wallet/);
  });
});

describe('decreaseQuantity', () => {
  afterAll(() => {});

  it('decreaseQuantity.should.be.success', () => {
    // Arrange
    const price = 20000;

    // Act
    const buyProductResult = product.decreaseQuantity('Heineken', 1);

    // Assert
    expect(buyProductResult).toBeTruthy();
  });

  it('decreaseQuantity.should.be.fail', () => {
    // Arrange
    const price = 110000;

    // Act & Assert
    expect(() => {
      product.decreaseQuantity('Heineken', 5);
    }).toThrowError(/Must less than 3 items/);
  });
});
