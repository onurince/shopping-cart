class DeliveryCost {
  private defaultDeliverCost: number = 9.99;
  private deliverCostProduct: number = 1.99;
  private deliverCostDelivery: number = 0.99;

  public getDefaultDeliverCost(): number {
    return this.defaultDeliverCost;
  }

  public setDefaultDeliverCost(defaultDeliverCost: number): void {
    this.defaultDeliverCost = defaultDeliverCost;
  }

  public getDeliverCostProduct(): number {
    return this.deliverCostProduct;
  }

  public setDeliverCostProduct(deliverCostProduct: number): void {
    this.deliverCostProduct = deliverCostProduct;
  }

  public getDeliverCostDelivery(): number {
    return this.deliverCostDelivery;
  }

  public setDeliverCostDelivery(deliverCostDelivery: number): void {
    this.deliverCostDelivery = deliverCostDelivery;
  }

}

export default DeliveryCost;