import ShoppingCart from "../../src/Cart/ShoppingCart";
import Category from "../../src/Cart/Category";
import Product from "../../src/Cart/Product";
import Campaign from "../../src/Discount/Campaign";
import PercentageDiscountStrategy from "../../src/Discount/Strategy/PercentageDiscountStrategy";
import FlatRateDiscountStrategy from "../../src/Discount/Strategy/FlatRateDiscountStrategy";
import DiscountTypes from "../../src/Discount/DiscountTypes";
import Coupon from "../../src/Discount/Coupon";


describe('ShoppingCart Test Suite', () => {
  let shoppingCart: ShoppingCart;
  let tvCategory: Category;
  let phoneCategory: Category;
  let samsungTV: Product;
  let iphone: Product;
  let phoneCampaign: Campaign;
  let phoneTotalAmountCampaign: Campaign;
  let tvCampaign: Campaign;
  let tvFlatRateCampaign: Campaign;
  let flatRateCoupon: Coupon;
  let percentageRateCoupon: Coupon;
  let minimumCartAmountCoupon: Coupon;

  beforeEach(() => {
    shoppingCart = new ShoppingCart();
    tvCategory = new Category('TV');
    phoneCategory = new Category('Smart Phone');
    iphone = new Product('iphone', 100, phoneCategory);
    samsungTV = new Product('Samsung TV', 120, tvCategory);
    shoppingCart = new ShoppingCart();
    shoppingCart.addItem(iphone, 2);
    shoppingCart.addItem(samsungTV, 1);
    phoneCampaign = new Campaign(10, 2, phoneCategory, new PercentageDiscountStrategy());
    phoneTotalAmountCampaign = new Campaign(20, 200, phoneCategory, new FlatRateDiscountStrategy(), DiscountTypes.TOTALPRICE);
    tvCampaign = new Campaign(10, 5, tvCategory, new PercentageDiscountStrategy());
    tvFlatRateCampaign = new Campaign(10, 1, tvCategory, new FlatRateDiscountStrategy());
    percentageRateCoupon = new Coupon(20, 100, new PercentageDiscountStrategy());
    flatRateCoupon = new Coupon(50, 300, new FlatRateDiscountStrategy());
    minimumCartAmountCoupon = new Coupon(150, 1000, new FlatRateDiscountStrategy());
  });

  test('Shopping cart should contain 2 producs', () => {
    expect(shoppingCart.getProductCount()).toBe(2);
  });

  test('Shopping cart contains 2 product if new phone added', () => {
    shoppingCart.addItem(iphone, 2);
    expect(shoppingCart.getProductCount()).toBe(2);
  });

  test('Shopping cart should contains 3 deliveries', () => {
    expect(shoppingCart.getDeliveriesCount()).toBe(3);
  });

  test('Shopping cart should contain 2 categories', () => {
    expect(shoppingCart.getCategoryCount()).toBe(2);
  });

  test('Shopping cart adding existing item should increase deliveriesCount', () => {
    expect(shoppingCart.getDeliveriesCount()).toBe(3);
    shoppingCart.addItem(iphone, 2);
    expect(shoppingCart.getDeliveriesCount()).toBe(5);
  });

  test('Shopping cart adding existing item should increase categoryDeliveries', () => {
    expect(shoppingCart.getDeliveriesCountForCategory(phoneCategory)).toBe(2);
    shoppingCart.addItem(iphone, 2);
    expect(shoppingCart.getDeliveriesCountForCategory(phoneCategory)).toBe(4);
  });

  test('Shopping cart adding existing item should be the same as before', () => {
    expect(shoppingCart.getProductCount()).toBe(2);
    shoppingCart.addItem(iphone, 2);
    expect(shoppingCart.getProductCount()).toBe(2);
  });

  test('Shopping cart add new Product should increase product count', () => {
    expect(shoppingCart.getProductCount()).toBe(2);
    const samsungPhone = new Product('Samsung S10', 90, phoneCategory);
    shoppingCart.addItem(samsungPhone, 3);
    expect(shoppingCart.getProductCount()).toBe(3);
  });

  test('Shopping cart add new Product should increase total product price', () => {
    expect(shoppingCart.getTotalPrice()).toBe(320.00);
    const samsungPhone = new Product('Samsung S10', 90, phoneCategory);
    shoppingCart.addItem(samsungPhone, 3);
    expect(shoppingCart.getTotalPrice()).toBe(590.00);
  })

  test('Shopping cart should contains 2 deliveries for SmartPhone category', () => {
    expect(shoppingCart.getDeliveriesCountForCategory(phoneCategory)).toBe(2);
  });

  test('Shopping cart price for category should be 120 for TV category', () => {
    expect(shoppingCart.getPriceForCategory(tvCategory)).toBe(120);
  });

  test('Shopping cart Total Product Price should be 320', () => {
    expect(shoppingCart.getTotalProductPrice()).toBe(320);
  });

  test('Shopping cart delivery cost should be 9.99', () => {
    shoppingCart.applyDeliveryCost();
    expect(shoppingCart.getDeliveryCost()).toBe(9.99);
  });

  test('Shopping cart discount amount should be 20', () => {
    shoppingCart.applyDiscounts(phoneCampaign);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(20);
  });

  test('Shopping cart discount should not be applied because of not meeting the criteria', () => {
    shoppingCart.applyDiscounts(tvCampaign);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(0);
  });

  test('Shopping cart discount should be 10 if the flatrate discount applied for tv category', () => {
    shoppingCart.applyDiscounts(tvFlatRateCampaign);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(10);
  });

  test('Shopping cart discount should be 20 if the flatrate discount applied for totalPrice', () => {
    shoppingCart.applyDiscounts(phoneTotalAmountCampaign);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(20);
  });

  test('Shopping cart discount should be 64 if the percentage coupon applied to the cart', () => {
    shoppingCart.applyDiscounts(percentageRateCoupon);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(64);
  });

  test('Shopping cart discount should be 50 if the flat rate coupon applied to the cart', () => {
    shoppingCart.applyDiscounts(flatRateCoupon);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(50);
  });

  test('Shopping cart coupon should not be applied because of not meeting the criteria', () => {
    shoppingCart.applyDiscounts(minimumCartAmountCoupon);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(0);
  });

  test('Shopping cart discount should be 74 if coupon and campaign applied', () => {
    shoppingCart.applyDiscounts(tvFlatRateCampaign, percentageRateCoupon);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(74);
  });

  test('Shopping cart discount should be 114 if two coupons applied', () => {
    shoppingCart.applyDiscounts(flatRateCoupon, percentageRateCoupon);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(114);
  });

  test('Shopping cart should allow to apply same coupon once', () => {
    shoppingCart.applyDiscounts(flatRateCoupon, flatRateCoupon);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(50);
  });

  test('Shopping cart should allow to apply same campaign once', () => {
    shoppingCart.applyDiscounts(phoneTotalAmountCampaign, phoneTotalAmountCampaign);
    expect(shoppingCart.getTotalDiscountAmount()).toBe(20);
  });

  test('Shopping cart price should be 320.00 without delivery cost', () => {
    expect(shoppingCart.getTotalPrice()).toBe(320.00);
  });
  
  test('Shopping cart price should be 329.99 if no discount applied', () => {
    shoppingCart.applyDeliveryCost();
    expect(shoppingCart.getCartPrice()).toBe(329.99);
  });  

  test('Shopping cart price should be 206 if two coupons applied', () => {
    shoppingCart.applyDiscounts(flatRateCoupon, percentageRateCoupon);
    expect(shoppingCart.getTotalPrice()).toBe(206);
  });

  test('Shopping cart price should be 215.99 if two coupons applied', () => {
    shoppingCart.applyDiscounts(flatRateCoupon, percentageRateCoupon);
    shoppingCart.applyDeliveryCost();
    expect(shoppingCart.getCartPrice()).toBe(215.99);
  });

  test('Shopping cart coupon discont amount should be ', () => {
    shoppingCart.applyDiscounts(tvFlatRateCampaign, percentageRateCoupon);
    expect(shoppingCart.getCouponDiscountAmount()).toBe(64);
  });

  test('Shopping cart campaing discont amount should be ', () => {
    shoppingCart.applyDiscounts(tvFlatRateCampaign, percentageRateCoupon);
    expect(shoppingCart.getCampaignDiscountAmount()).toBe(10);
  });

  test('Shoppin car summary called console.log', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    shoppingCart.summary();
    expect(console.log).toHaveBeenNthCalledWith(1, 'Cart Summary .....');
    expect(console.log).toBeCalledTimes(10);
    expect(console.log).toHaveBeenLastCalledWith('Category count', 2);
  });
});