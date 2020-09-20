import Discount from './Discount';
import ShoppingCart from '../Cart/ShoppingCart';
import Category from '../Cart/Category';
import DiscountTypes from './DiscountTypes';
import DiscountStrategy from './Strategy/DiscountStrategy';

class Campaign extends Discount {

  private category: Category;
  private discountType: DiscountTypes;

  constructor(discountAmount: number, minimumRequired: number, category: Category, discountStrategy: DiscountStrategy, discountType: DiscountTypes = DiscountTypes.DELIVERIESCOUNT) {
    super(discountAmount, minimumRequired, discountStrategy);
    this.category = category;
    this.discountType = discountType;
  }

  public calculate(cart: ShoppingCart) {
    let discountRule: number = 0;
    if (this.discountType === DiscountTypes.DELIVERIESCOUNT) {
      discountRule = cart.getDeliveriesCountForCategory(this.category);
    } else if (this.discountType === DiscountTypes.TOTALPRICE) {
      discountRule = cart.getPriceForCategory(this.category);
    }
    if (discountRule < this.minimumRequired) {
      return 0;
    }
    return this.discountStrategy.discount(cart.getPriceForCategory(this.category), this.discountAmount);
  }

  public getCategory(): Category {
    return this.category;
  }
}

export default Campaign;
