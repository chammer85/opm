import { ComboboxData } from '@mantine/core';
import { IngredientType } from '../types/ingredients';

export const cleanIngredientName = (ingredient: string): string =>
  ingredient.toLowerCase().replace(/\s+/g, '-');

export function getIngredientsOptions(ingredients: IngredientType[]): ComboboxData {
  return ingredients
    .map(ingredient => {
      return {
        value: ingredient.id,
        label: ingredient.name,
      };
    })
    .sort();
}
