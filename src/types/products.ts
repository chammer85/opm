import { SortOrderType } from '../constants/sortOptions.ts';
import { Ingredient } from './ingredients.ts';

export interface ProductContextType {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  sortOrder: SortOrderType;
  setSortOrder: (order: SortOrderType) => void;
}

export interface ProductType {
  id: string;
  name: string;
  price: string | number;
  image?: string;
  ingredients: Ingredient[];
  baseProduct?: string;
}

