class Category {
  private title: string;
  private parent: Category | null;

  constructor(title: string, parent: Category | null = null) {
    this.title = title;
    this.parent = parent;
  }

  public getTitle(): string {
    return this.title;
  }

  public getParent(): Category | null {
    return this.parent;
  }
}

export default Category;