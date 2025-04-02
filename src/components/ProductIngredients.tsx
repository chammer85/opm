import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { ProductType, Ingredient } from '../types';
import { Button, Stack, Group, Image } from '@mantine/core';
import { capitalizeWords } from '../utils/stringUtils';
import { getIngredientImage } from '../data/BaseIngredients';

interface Props {
  product: ProductType; // Product prop now handles both the product and its ingredients
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
  const reversedBaseProducts = baseProducts.reverse();
  return reversedBaseProducts.flatMap(p => p.ingredients);
};

export default function ProductIngredients(props: Props) {
  const { product, stacked } = props;

  const productContext = useContext(ProductContext);
  if (!productContext) throw new Error("ProductContext not found.");
  const { products } = productContext;

  const [allBaseIngredients, setAllBaseIngredients] = useState<Ingredient[]>([]);

  // Effect to collect base ingredients when product is available
  useEffect(() => {
    if (product) {
      const ingredients = collectAllBaseIngredients(product, products);
      setAllBaseIngredients(ingredients);
    }
  }, [product, products]);

  // Merge the base ingredients with the product's own ingredients
  const allIngredients = [...allBaseIngredients, ...product.ingredients];

  return stacked ? (
    <Stack bg="var(--mantine-color-body)" align="stretch" justify="center" gap="sm">
      {allIngredients.map((ingredient, key) => (
        <Button key={key}>{capitalizeWords(ingredient.name)}</Button>
      ))}
    </Stack>
  ) : (
    <Group mt="lg">
      {allIngredients.map((ingredient, key) => {
        const ingredientImage = getIngredientImage(ingredient.name);
        return (
          <Button key={key} size="md">
            <Image
              width={30}
              height={30}
              src={ingredientImage}
              style={{ objectFit: "contain" }}
            />
            {ingredient.name}
          </Button>
        );
      })}
    </Group>
  );
}
