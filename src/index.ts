import Category from './Cart/Category';
import Product from './Cart/Product';
import ShoppingCart from './Cart/ShoppingCart';
import Coupon from './Discount/Coupon';
import Discount from './Discount/Discount';
import PercentageDiscountStrategy from './Discount/Strategy/PercentageDiscountStrategy';
import Campaign from './Discount/Campaign';
import FlatRateDiscountStrategy from './Discount/Strategy/FlatRateDiscountStrategy';
import DiscountTypes from './Discount/DiscountTypes';

const food: Category = new Category('food');
const vegetables: Category = new Category('vegetables', food);

const apple = new Product('Apple', 100.0, vegetables);
const almond = new Product('Almonds', 150.0, food);
const cherry = new Product('Cherry', 200.0, food);

const cart: ShoppingCart = new ShoppingCart();
cart.addItem(apple, 1);
cart.addItem(almond, 2);
cart.addItem(apple, 3);
cart.addItem(cherry, 3);

const discountAmount10 = 10;
const discountAmount20 = 20;
const minimumRequired = 100;
const coupon10: Discount = new Coupon(discountAmount10, minimumRequired, new PercentageDiscountStrategy());
const coupon20: Discount = new Coupon(discountAmount20, minimumRequired, new PercentageDiscountStrategy());

const discountAmount30 = 30;
const minimumRequiredDeliveries = 1;
const campaign30: Discount = new Campaign(discountAmount30, minimumRequiredDeliveries, food, new FlatRateDiscountStrategy(), DiscountTypes.DELIVERIESCOUNT);
cart.applyDiscounts(coupon10, campaign30, coupon20);
cart.applyDeliveryCost();

cart.summary();
