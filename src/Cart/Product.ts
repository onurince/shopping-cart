import Category from './Category';

class Product {
  private title: string;
  private price: number;
  private category: Category;

  constructor(title: string, price: number, category: Category) {
    if (title === '' || title === undefined || title === null) {
      throw new Error('title cannot be empty');
    }

    if (price <= 0) {
      throw new Error('price cannot be lower than or equal to 0');
    }

    this.title = title;
    this.price = price;
    this.category = category;
  }

  getTitle(): string {
    return this.title;
  }

  getPrice(): number {
    return this.price;
  }

  getCategory(): Category {
    return this.category;
  }
}

export default Product;
