import ShoppingCart from "../Cart/ShoppingCart";
import DiscountStrategy from './Strategy/DiscountStrategy';

abstract class Discount {
  protected discountAmount: number;
  protected minimumRequired: number;
  protected discountStrategy: DiscountStrategy;

  constructor(discountAmount: number, minimumRequired: number, discountStrategy: DiscountStrategy) {
    this.discountAmount = discountAmount;
    this.minimumRequired = minimumRequired;
    this.discountStrategy = discountStrategy;
  }

  abstract calculate(cart: ShoppingCart): number;
}

export default Discount;