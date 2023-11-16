const decrease = jest
  .fn()
  .mockImplementationOnce(() => {
    console.log('mock decrease func');
    return true;
  })
  .mockImplementationOnce(() => false);
export { decrease };
