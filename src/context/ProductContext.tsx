import { createContext } from 'react';
import { ProductContextType } from '../types/products';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
