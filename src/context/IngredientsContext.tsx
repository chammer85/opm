import { createContext } from 'react';
import { IngredientsContextType } from '../types/ingredients';

export const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);
