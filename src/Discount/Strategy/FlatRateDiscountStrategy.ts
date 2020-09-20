import DiscountStrategy from './DiscountStrategy';

class FlatRateDiscountStrategy implements DiscountStrategy {
  public discount(totalPrice: number, discountQuantity: number): number {
    if (discountQuantity <= 0) {
      return 0;
    }
    return discountQuantity;
  }
}

export default FlatRateDiscountStrategy;
