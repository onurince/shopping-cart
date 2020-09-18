import Category from '../src/Category';

describe('Category Test Suite', () => {

  let foodCategory: Category;
  let fruitCategory: Category;

  beforeEach(() => {
    foodCategory = new Category('food');
    fruitCategory = new Category('fruit', foodCategory);
  });

  test('Category title should be equal to "fruit"', () => {
    expect(fruitCategory.getTitle()).toBe('fruit');
  });

  test('Parent category should be instance of Category', () => {
    expect(fruitCategory.getParent()).toBeInstanceOf(Category);
  });

  test('Parent category title should be equal to "food"', () => {
    const parent = fruitCategory.getParent();
    if (parent !== null) {
      expect(parent.getTitle()).toBe('food');
    }

  });

  test('food category should not contain parent category', () => {
    expect(foodCategory.getParent()).toBeNull();
  });

});