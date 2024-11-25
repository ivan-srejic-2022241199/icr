export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discount: string;
  cover_image: string;
  images: string[];
  created_at: string;
  updated_at: string;
  categories: Category[];
  ProductSizeRelation: ProductSizeRelation[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductSizeRelation {
  id: number;
  productId: number;
  productSizeId: number;
  quantity: number;
  productSize: ProductSize;
}

export interface ProductSize {
  id: number;
  size: string;
}
