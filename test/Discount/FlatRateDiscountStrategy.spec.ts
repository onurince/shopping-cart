import FlatRateDiscountStrategy from '../../src/Discount/Strategy/FlatRateDiscountStrategy';

describe('Percentage Discount Strategy Test Suite', () => {
  let flatDiscountStrategy: FlatRateDiscountStrategy;


  beforeEach(() => {
    flatDiscountStrategy = new FlatRateDiscountStrategy();
  });

  test('Discount amount should be 50', () => {
    expect(flatDiscountStrategy.discount(100, 50)).toBe(50);
  });

  test('Discount amount should be 0 if amount is negative', () => {
    expect(flatDiscountStrategy.discount(100, -10)).toBe(0)
  });

});