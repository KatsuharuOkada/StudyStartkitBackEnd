import * as math from './math';

describe('math', () => {
  test('Call math.add', () => {
    const result = math.add(1, 2);
    expect(result).toBe(3);
  });
  test('Call math.subtract', () => {
    const result = math.subtract(2, 2);
    expect(result).toBe(0);
  });
  test('Call math.multi', () => {
    const result = math.multiply(1, 2);
    expect(result).toBe(2);
  });
  test('Call math.divide', () => {
    const result = math.divide(10, 2);
    expect(result).toBe(5);
  });
});
