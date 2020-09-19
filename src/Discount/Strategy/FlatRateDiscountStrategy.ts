import DiscountStrategy from './DiscountStrategy';

class FlatRateDiscountStrategy implements DiscountStrategy {
  public discount(totalPrice: number, discountQuantity: number): number {
    return discountQuantity;
  }
}

export default FlatRateDiscountStrategy;