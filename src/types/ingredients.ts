export interface IngredientType {
  id: string;
  name: string;
  image: string;
}

export interface IngredientsContextType {
  ingredients: IngredientType[];
}
