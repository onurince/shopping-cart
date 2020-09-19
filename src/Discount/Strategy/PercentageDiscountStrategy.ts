import DiscountStrategy from './DiscountStrategy';

class PercentageDiscountStrategy implements DiscountStrategy {
  public discount(totalPrice: number, discountQuantity: number): number {
    return totalPrice * (discountQuantity / 100);
  }
}

export default PercentageDiscountStrategy;