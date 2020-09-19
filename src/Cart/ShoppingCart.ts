import Product from "./Product";
import Discount from '../Discount/Discount';
import Category from './Category';

class ShoppingCart {
  private cartItems: Map<Product, number> = new Map();
  private totalProductPrice: number = 0.0;
  private totalDiscountAmount: number = 0.0;
  private totalShippingPrice: number = 0.0;
  private totalBasePrice: number = 0.0;
  private totalPrice: number = 0.0;

  public addItem(product: Product, quantity: number): void {
    const currentQty: number = this.cartItems.get(product) ?? 0;
    quantity += currentQty;
    this.cartItems.set(product, quantity);
  }

  public applyDiscounts(...discounts: Discount[]): void {
    this.totalDiscountAmount = discounts.map((discount) => discount.calculate(this))
      .reduce((previous, current) => previous + current, 0);
  }

  public applyDeliveryCost() {
    // todo
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

  public getDeliveriesCount(): number {
    return Array.from(this.cartItems.values()).reduce((previous, current) => previous + current, 0);
  }

  public getProductCount() {
    return this.cartItems.size;
  }

  public getCategoryCount() {
    return Array.from(this.cartItems.keys()).map(product => product.getCategory()).length;
  }

  public getPriceForCategory(category: Category) {
    return Array.from(this.cartItems)
      .filter(([product]) => product.getCategory().getTitle() === category.getTitle())
      .map(([product, quantity]) => product.getPrice() * quantity)
      .reduce((previous, current) => previous + current, 0);
  }

  public getDeliveriesCountForCategory(category: Category) {
    return Array.from(this.cartItems)
      .filter(([product]) => product.getCategory().getTitle() === category.getTitle())
      .map(([, quantities]) => quantities)
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