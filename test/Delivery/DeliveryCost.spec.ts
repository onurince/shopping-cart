import DeliveryCost from '../../src/Delivery/DeliveryCost';

describe('Delivery Test Suite', () => {
  let deliveryCost: DeliveryCost;

  beforeEach(() => {
    deliveryCost = new DeliveryCost();
  });

  test('Default Delivery cost should 9.99', () => {
    expect(deliveryCost.getDefaultDeliverCost()).toBe(9.99);
  });

  test('Per Product cost should 1.99', () => {
    expect(deliveryCost.getDeliverCostProduct()).toBe(1.99);
  });

  test('Per Deliveries cost should 0.99', () => {
    expect(deliveryCost.getDeliverCostDelivery()).toBe(0.99);
  });

  test('Set Default cost to 10.00', () => {
    deliveryCost.setDefaultDeliverCost(10.00);
    expect(deliveryCost.getDefaultDeliverCost()).toBe(10.00);
  });

  test('Set per Product cost to 2.00', () => {
    deliveryCost.setDeliverCostProduct(2.00);
    expect(deliveryCost.getDeliverCostProduct()).toBe(2.00);
  });

  test('Set per Delivery cost to 1.00', () => {
    deliveryCost.setDeliverCostDelivery(1.00);
    expect(deliveryCost.getDeliverCostDelivery()).toBe(1.00);
  });

});