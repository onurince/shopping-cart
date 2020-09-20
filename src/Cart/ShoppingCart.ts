import Product from "./Product";
import Discount from '../Discount/Discount';
import Category from './Category';
import Coupon from "../Discount/Coupon";
import Campaign from "../Discount/Campaign";
import DeliveryCostCalculator from '../Delivery/DeliveryCostCalculator';

class ShoppingCart {
  private cartItems: Map<Product, number> = new Map();
  private totalProductPrice: number = 0.0;
  private totalDiscountAmount: number = 0.0;
  private totalShippingPrice: number = 0.0;
  private totalBasePrice: number = 0.0;
  private totalPrice: number = 0.0;
  private discounts: Map<Discount, number> = new Map();
  private deliveryCalculator: DeliveryCostCalculator = new DeliveryCostCalculator();

  public addItem(product: Product, quantity: number): void {
    const currentQty: number = this.cartItems.get(product) ?? 0;
    quantity += currentQty;
    this.cartItems.set(product, quantity);
  }

  public applyDiscounts(...discounts: Discount[]): void {
    discounts.map((discount) => this.applyDiscount(discount));
  }

  private applyDiscount(discount: Discount): void {
    if (this.discounts.has(discount)) {
      return;
    }

    const discountAmount: number = discount.calculate(this);
    if (discountAmount > 0) {
      this.totalDiscountAmount += discountAmount;
      this.discounts.set(discount, discountAmount);
    }
  }

  public getTotalDiscountAmount(): number {
    return this.totalDiscountAmount;
  }

  public applyDeliveryCost(): void {
    this.totalShippingPrice = this.deliveryCalculator.calculate(this);
  }

  public getDeliveryCost(): number {
    return this.totalShippingPrice;
  }

  public getTotalProductPrice(): number {
    this.totalProductPrice = Array.from(this.cartItems)
      .map(([product, quantity]) => product.getPrice() * quantity)
      .reduce((previous, current) => previous + current, 0);
    return this.totalProductPrice;
  }

  public getTotalPrice(): number {
    return this.getTotalProductPrice() - this.totalDiscountAmount;
  }

  public getCartPrice(): number {
    return this.getTotalProductPrice() - this.totalDiscountAmount + this.totalShippingPrice;
  }

  public getDeliveriesCount(): number {
    return Array.from(this.cartItems.values()).reduce((previous, current) => previous + current, 0);
  }

  public getProductCount(): number {
    return this.cartItems.size;
  }

  public getCategoryCount(): number {
    return Array.from(this.cartItems.keys()).map(product => product.getCategory()).length;
  }

  public getPriceForCategory(category: Category): number {
    return Array.from(this.cartItems)
      .filter(([product]) => product.getCategory().getTitle() === category.getTitle())
      .map(([product, quantity]) => product.getPrice() * quantity)
      .reduce((previous, current) => previous + current, 0);
  }

  public getDeliveriesCountForCategory(category: Category): number {
    return Array.from(this.cartItems)
      .filter(([product]) => product.getCategory().getTitle() === category.getTitle())
      .map(([, quantities]) => quantities)
      .reduce((previous, current) => previous + current, 0);
  }

  public getCouponDiscountAmount(): number {
    return Array.from(this.discounts)
      .filter(([product]) => product instanceof Coupon)
      .map(([, amount]) => amount)
      .reduce((previous, current) => previous + current, 0);
  }

  public getCampaignDiscountAmount(): number {
    return Array.from(this.discounts)
      .filter(([product]) => product instanceof Campaign)
      .map(([, amount]) => amount)
      .reduce((previous, current) => previous + current, 0); 
  }

  public summary(): void {
    console.log('Cart Summary .....');

    this.cartItems.forEach((quantity, product) => {
      console.log(product.getTitle() + ' ' + product.getPrice() + ' ' + quantity);
    });

    console.log('Total Product Price', this.getTotalProductPrice());
    console.log('Total Discount Price', this.totalDiscountAmount);
    console.log('Total Shipping Cost', this.totalShippingPrice);
    console.log('Cart Price', this.getTotalPrice());
    console.log('Deliveries count', this.getDeliveriesCount());
    console.log('Product count', this.getProductCount());
    console.log('Category count', this.getCategoryCount());
  }

}

export default ShoppingCart;