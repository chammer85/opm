import { SortOrderType } from '../constants/sortOptions';
import { IngredientType } from './ingredients';

export interface BaseProductType {
  id: string;
  name: string;
  image: string;
}

export interface ProductsContextType {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  sortOrder: SortOrderType;
  setSortOrder: (order: SortOrderType) => void;
  deleteProduct: (id: string) => void;
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType | null) => void;
}

export interface ProductType {
  id: string;
  name: string;
  price: string | number;
  image?: string;
  ingredients: IngredientType[];
  baseProduct?: string;
}
