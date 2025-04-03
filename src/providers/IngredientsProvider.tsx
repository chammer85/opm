import { ReactNode, useState } from 'react';
import { IngredientsContext } from '../context/IngredientsContext';
import { IngredientType } from '../types/ingredients';
import { data } from '../data/Ingredients';


export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
  const [ ingredients ] = useState<IngredientType[]>(data);

  return (
    <IngredientsContext.Provider value={{ ingredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};
