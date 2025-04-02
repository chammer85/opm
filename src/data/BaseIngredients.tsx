import { ComboboxData } from '@mantine/core';
import { ManifestEntry } from '*.json';

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

// Variable to hold the manifest data
let manifest: Record<string, ManifestEntry> | null = null;

// Function to load the manifest dynamically
const loadManifest = async () => {
  if (!manifest && import.meta.env.MODE === 'production') {
    try {
      const data = await import('../../dist/.vite/manifest.json');
      manifest = data.default;
    } catch (error) {
      console.error("Error loading manifest:", error);
    }
  }
};

// Function to get the ingredient image (returns a Promise)
export async function getIngredientImage(ingredient: string): Promise<string> {
  const isProd = import.meta.env.MODE === 'production';
  const cleanedIngredient = cleanIngredientName(ingredient);

  // Development images (Vite glob imports)
  const devImages = import.meta.glob('/src/assets/ingredients/**/*.png', { eager: true });

  if (isProd) {
    await loadManifest();

    // Ensure manifest is loaded before proceeding.
    if (manifest) {
      const ingredientIconKey = `src/assets/ingredients/${cleanedIngredient}/${cleanedIngredient}-icon.png`;

      // Check if the image exists in the manifest and return its hashed path
      if (manifest[ingredientIconKey]) {
        return manifest[ingredientIconKey].file;
      }

      console.warn(`Image for ${ingredient} not found in manifest.`);
      return '';
    }
  }

  // In development, filter images based on the glob
  const basePath = `/assets/ingredients/${cleanedIngredient}/${cleanedIngredient}-icon.png`;
  const foundPath = Object.keys(devImages).find((path) => path.includes(basePath));

  return foundPath ? foundPath.replace(/^\/src/, '/opm/src') : '';
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
