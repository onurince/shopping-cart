# Shopping Cart
Simple shopping cart class implementation in Typescript

Features
- Add item and increase quantity 
- Define category based campaign
- Define coupons to make discount to cart.
- Discount rule can be percentage or flat rate amount
- Calculate shipping cost.

# Setup
1. Clone or download the source code. 
2. In the root run the following
  ```shell
  $ yarn install
```



# Test
```shell
$ yarn test
$ yarn test-coverage
```

# Simple Usage
```typescript
import Product from './Cart/Product';
import Campaign from './Cart/Campaign';
import ShoppingCart from './CartShoppingCart;

const food: Category = new Category('food');
const watermelon: Product = new Product('Watermelon', 10, food);
const melon: Product = new Product('Melon', 5, food);

const cart: ShoppingCart = new ShoppingCart();
cart.addItem(watermelon, 10);
cart.addItem(melon, 8);

const couponDiscountAmount = 10;
const couponMinimumRequired = 100;
const coupon = new Coupon(couponDiscountAmount, couponMinimumRequired, new PercentageDiscountStrategy());

const campaignDiscountAmount = 10;
const campaignMinimumRequired = 10;
const campaign = new Campaign(campaignDiscountAmount, campaignMinimumRequired, new FlatRateDiscountStrategy());

cart.applyDiscounts(coupon, campaign);
cart.applyDeliveryCosts();

cart.summary();
```

