import DiscountStrategy from './DiscountStrategy';

class PercentageDiscountStrategy implements DiscountStrategy {
  public discount(totalPrice: number, discountQuantity: number): number {
    if (discountQuantity <= 0) {
      return 0;
    }
    return totalPrice * (discountQuantity / 100);
  }
}

export default PercentageDiscountStrategy;
