interface DiscountStrategy {
  discount(totalPrice: number, discountQuantity: number): number;
}

export default DiscountStrategy;