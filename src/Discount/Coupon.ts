import Discount from './Discount';
import ShoppingCart from '../Cart/ShoppingCart';
import DiscountStrategy from './Strategy/DiscountStrategy';

class Coupon extends Discount {

  constructor(discountAmount: number, minimumRequired: number, discountStrategy: DiscountStrategy) {
    super(discountAmount, minimumRequired, discountStrategy);
  }

  public calculate(cart: ShoppingCart) {
    if (cart.getTotalProductPrice() < this.minimumRequired) {
      return 0;
    }

    return this.discountStrategy.discount(cart.getTotalProductPrice(), this.discountAmount);
  }

}

export default Coupon;