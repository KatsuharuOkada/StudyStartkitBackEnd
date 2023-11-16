export const mockDecreaseFunc = jest
  .fn()
  .mockImplementationOnce(() => {
    console.log('#Mock.Inventory.decrease');
    return true;
  })
  .mockImplementationOnce(() => {
    throw new Error('#Mock.Inventory.Throw.Error');
  });

export const Inventory = jest.fn().mockImplementation(() => {
  return {
    decrease: mockDecreaseFunc,
  };
});
