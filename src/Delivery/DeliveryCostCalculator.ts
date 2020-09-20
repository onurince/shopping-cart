import DeliveryCost from './DeliveryCost';
import ShoppingCart from '../Cart/ShoppingCart';

class DeliveryCostCalculator {

  private delivery: DeliveryCost = new DeliveryCost();

  public calculate(cart: ShoppingCart) {
    const costPerDelivery = cart.getDeliveriesCount() * this.delivery.getDeliverCostDelivery();
    const costPerProduct = cart.getProductCount() * this.delivery.getDeliverCostProduct();
    const costDefaultDelivery = this.delivery.getDefaultDeliverCost();
    // return Number(Math.max(costPerDelivery, costPerProduct, costDefaultDelivery));
    if ((costPerDelivery + costPerProduct) < costDefaultDelivery) {
      return costDefaultDelivery;
    }
    return Number((costPerDelivery + costPerProduct).toFixed(2));
  }
}

export default DeliveryCostCalculator;