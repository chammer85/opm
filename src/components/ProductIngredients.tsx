import { useContext, useEffect, useState, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import { ProductType, Ingredient } from '../types';
import { Button, Stack, Group, Image } from '@mantine/core';
import { capitalizeWords } from '../utils/stringUtils';
import { getIngredientImage } from '../data/BaseIngredients';

interface Props {
  product: ProductType;
  stacked?: boolean;
}

const collectBaseIngredients = (
  currentProduct: ProductType,
  products: ProductType[]
): ProductType[] => {
  const baseProduct = products.find(p => p.name === currentProduct.baseProduct);
  return baseProduct ? [baseProduct, ...collectBaseIngredients(baseProduct, products)] : [];
};

const collectAllBaseIngredients = (
  currentProduct: ProductType,
  products: ProductType[]
): Ingredient[] => {
  const baseProducts = collectBaseIngredients(currentProduct, products);
  return baseProducts.reverse().flatMap(p => p.ingredients);
};

export default function ProductIngredients({ product, stacked }: Props) {
  const productContext = useContext(ProductContext);
  if (!productContext) throw new Error("ProductContext not found.");
  const { products } = productContext;

  const [allBaseIngredients, setAllBaseIngredients] = useState<Ingredient[]>([]);
  const [ingredientImages, setIngredientImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      const ingredients = collectAllBaseIngredients(product, products);
      setAllBaseIngredients(ingredients);
    }
  }, [product, products]);

  // Use useMemo to avoid unnecessary recalculations
  const allIngredients = useMemo(
    () => [...allBaseIngredients, ...product.ingredients],
    [allBaseIngredients, product.ingredients]
  );

  // Fetch ingredient images asynchronously
  useEffect(() => {
    async function fetchImages() {
      const imageMap: Record<string, string> = {};
      for (const ingredient of allIngredients) {
        imageMap[ingredient.name] = await getIngredientImage(ingredient.name);
      }
      setIngredientImages(imageMap);
    }

    fetchImages();
  }, [allIngredients]);

  return stacked ? (
    <Stack bg="var(--mantine-color-body)" align="stretch" justify="center" gap="sm">
      {allIngredients.map((ingredient, key) => (
        <Button key={key}>{capitalizeWords(ingredient.name)}</Button>
      ))}
    </Stack>
  ) : (
    <Group mt="lg">
      {allIngredients.map((ingredient, key) => (
        <Button key={key} size="md">
          <Image
            width={30}
            height={30}
            src={ingredientImages[ingredient.name] || null}
            style={{ objectFit: "contain" }}
          />
          {ingredient.name}
        </Button>
      ))}
    </Group>
  );
}
