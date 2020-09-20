import PercentageDiscountStrategy from '../../src/Discount/Strategy/PercentageDiscountStrategy';

describe('Percentage Discount Strategy Test Suite', () => {
  let percentageDiscountStrategy: PercentageDiscountStrategy;

  beforeEach(() => {
    percentageDiscountStrategy = new PercentageDiscountStrategy();
  });

  test('Discount amount should be the %15 of the price', () => {
    expect(percentageDiscountStrategy.discount(100, 15)).toBe(15);
  });

  test('Discount amount should be 0 if amount is negative or zero', () => {
    expect(percentageDiscountStrategy.discount(100, -10)).toBe(0)
  });
});