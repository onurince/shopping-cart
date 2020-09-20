import DeliveryCostCalculator from '../../src/Delivery/DeliveryCostCalculator';
import ShoppingCart from '../../src/Cart/ShoppingCart';

jest.mock('../../src/Cart/ShoppingCart');

describe('Delivery Cost Calculator', () => {
  let shoppingCart: ShoppingCart;
  const deliveryCostCalculator = new DeliveryCostCalculator();

  beforeEach(() => {
    (ShoppingCart as jest.Mock).mockClear();
  })

  it('Should return default delivery cost(9.99) product and deliveries are set to 1', () => {
    (ShoppingCart as jest.Mock).mockImplementation(() => ({
      getDeliveriesCount: () => 1,
      getProductCount: () => 1,
    }));
    shoppingCart = new ShoppingCart();
    // (1 * 0.99 + 1 * 1.99) = 2.98 < 9.99
    expect(deliveryCostCalculator.calculate(shoppingCart)).toBe(9.99);
  });

  it('Should return costPerProduct cost(29.80) if product count are set to 10', () => {
    (ShoppingCart as jest.Mock).mockImplementation(() => ({
      getDeliveriesCount: () => 10,
      getProductCount: () => 10,
    }));
    shoppingCart = new ShoppingCart();
    // 10 * 0.99 + 10 * 1.99 = 29.80;
    expect(deliveryCostCalculator.calculate(shoppingCart)).toBe(29.80);
  });

  it('Should return costPerProduct cost(23.78) if deliveries count are set to 20', () => {
    (ShoppingCart as jest.Mock).mockImplementation(() => ({
      getDeliveriesCount: () => 20,
      getProductCount: () => 2,
    }));

    shoppingCart = new ShoppingCart();
    // 20 * 0.99 + 2 * 1.99 = 23.78
    expect(deliveryCostCalculator.calculate(shoppingCart)).toBe(23.78);
  });

});