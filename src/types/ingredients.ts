export interface IngredientType {
  id: string;
  name: string;
  image: string;
}

export interface IngredientsContextType {
  ingredients: IngredientType[];
}

export const getIngredientsById = (
  ingredients: IngredientType[],
): Record<string, IngredientType> => {
  return ingredients.reduce(
    (acc, ingredient) => {
      acc[ingredient.id] = ingredient;
      return acc;
    },
    {} as Record<string, IngredientType>,
  );
};
