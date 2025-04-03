import { useContext, useEffect, useState, useMemo, ReactElement } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { Button, Stack, Group, Image } from '@mantine/core';
import { capitalizeWords } from '../utils/stringUtils';
import { ProductType } from '../types/products';
import { IngredientType } from '../types/ingredients';

interface Props {
  product: ProductType;
  stacked?: boolean;
}

const collectBaseIngredients = (
  currentProduct: ProductType,
  products: ProductType[],
): ProductType[] => {
  const baseProduct = products.find(p => p.name === currentProduct.baseProduct);
  return baseProduct ? [baseProduct, ...collectBaseIngredients(baseProduct, products)] : [];
};

const collectAllBaseIngredients = (
  currentProduct: ProductType,
  products: ProductType[],
): IngredientType[] => {
  const baseProducts = collectBaseIngredients(currentProduct, products);
  return baseProducts.reverse().flatMap(p => p.ingredients);
};

export default function ProductIngredients({ product, stacked }: Props): ReactElement {
  const productContext = useContext(ProductsContext);
  if (!productContext) {
    throw new Error('ProductContext not found.');
  }
  const { products } = productContext;

  const [allBaseIngredients, setAllBaseIngredients] = useState<IngredientType[]>([]);

  useEffect(() => {
    if (product) {
      const ingredients = collectAllBaseIngredients(product, products);
      setAllBaseIngredients(ingredients);
    }
  }, [product, products]);

  // Use useMemo to avoid unnecessary recalculations
  const allIngredients = useMemo(
    () => [...allBaseIngredients, ...product.ingredients],
    [allBaseIngredients, product.ingredients],
  );

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
            src={ingredient.image || null}
            style={{ objectFit: 'contain' }}
          />
          {ingredient.name}
        </Button>
      ))}
    </Group>
  );
}
