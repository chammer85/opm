import { ComboboxData } from '@mantine/core';
import { loadManifest } from '../utils/helpers';

// Ingredients list
const ingredients = [
  'Acid',
  'Addy',
  'Banana',
  'Battery',
  'Chili',
  'Cuke',
  'Donut',
  'Energy Drink',
  'Flu Medicine',
  'Gasoline',
  'Horse Semen',
  'Iodine',
  'Mega Bean',
  'Motor Oil',
  'Mouth Wash',
  'Paracetamol',
  'Phosphorus',
  'Pseudo',
  'Viagra',
];

// Function to get the ingredient image (returns a Promise)
export async function getIngredientImage(ingredient: string): Promise<string> {
  const isProd = import.meta.env.MODE === 'production';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanedIngredient = cleanIngredientName(ingredient);

  // Development images (Vite glob imports)
  const devImages = import.meta.glob('/src/assets/ingredients/**/*.png', { eager: true });

  if (isProd) {
    const manifest = await loadManifest();

    // Ensure manifest is loaded before proceeding.
    if (manifest) {
      const ingredientIconKey = `src/assets/ingredients/${cleanedIngredient}/${cleanedIngredient}-icon.png`;

      // Check if the image exists in the manifest and return its hashed path.
      if (manifest[ingredientIconKey]) {
        console.log(manifest[ingredientIconKey].file);
        return manifest[ingredientIconKey].file;
      }

      console.warn(`Image for ${ingredient} not found in manifest.`);
      return '';
    }
  }

  // In development, filter images based on the glob
  const basePath = `/assets/ingredients/${cleanedIngredient}/${cleanedIngredient}-icon.png`;
  const foundPath = Object.keys(devImages).find((path) => path.includes(basePath));

  return foundPath ? foundPath.replace(/^\/src/, baseUrl + 'src') : '';
}

const cleanIngredientName = (ingredient: string) => (
  ingredient.toLowerCase().replace(/\s+/g, '-')
);

export function getIngredients(): ComboboxData {
  return ingredients.map((ingredient) => {
    return {
      value: ingredient,
      label: ingredient
    };
  }).sort();
}
