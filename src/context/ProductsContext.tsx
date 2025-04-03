import { createContext } from 'react';
import { ProductsContextType } from '../types/products';

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
