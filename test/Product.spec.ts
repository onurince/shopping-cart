import Product from '../src/Cart/Product';
import Category from '../src/Cart/Category';

describe('Product', () => {
  let defaultCategory: Category;
  let defaultProduct: Product;

  beforeEach(() => {
    defaultCategory = new Category('food');
    defaultProduct = new Product('test product', 100.0, defaultCategory);
  });

  test('Product title should be equal to "test product"', () => {
    expect(defaultProduct.getTitle()).toBe('test product');
  });

  test('Product title cannot be empty', () => {
    expect(() => {
      new Product('', 5, defaultCategory);
    }).toThrow('title cannot be');
  });

  test('Product price should be equal to 100.0', () => {
    expect(defaultProduct.getPrice()).toBe(100.0);
  });

  test('Product price cannot be 0', () => {
    expect(() => {
      new Product('product', 0.0, defaultCategory);
    }).toThrow(Error);
  });

  test('Product price cannot be lower than 0', () => {
    expect(() => {
      new Product('product', -1, defaultCategory);
    }).toThrow(Error);
  });

  test('Product category should be instance of Category', () => {
    expect(defaultProduct.getCategory()).toBeInstanceOf(Category);
  });

  test('Product category title shoul be equal to "food" ', () => {
    expect(defaultProduct.getCategory().getTitle()).toBe('food');
  });

});
