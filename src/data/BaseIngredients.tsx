import { ComboboxData } from '@mantine/core';

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

export function getIngredientImage(ingredient: string) {
  const basePath = '/src/assets/ingredients';
  const images = import.meta.glob('/src/assets/ingredients/**/*.png', { eager: true });
  const imagePath = `${basePath}/${cleanIngredientName(ingredient)}`;
  return Object.keys(images).filter((path) => {
    if (path == 'false' || !path.startsWith('/src/')) return false;
    //console.log(path, imagePath)
    return path.includes(imagePath);
  })
}

const cleanIngredientName = ((ingredient: string) => (
  ingredient.toLowerCase().replace(/\s+/g, '')
));

export function getIngredients(): ComboboxData {
  return ingredients.map((ingredient) => {
    return {
      value: ingredient,
      label: ingredient
    }
  }).sort();
}
