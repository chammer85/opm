import React, { ReactElement, useContext, useState } from 'react';
import { TextInput, NumberInput, Button, Select, MultiSelect, Text } from '@mantine/core';
import { ProductType } from '../types/products';
import { IngredientsContext } from '../context/IngredientsContext';
import { cleanIngredientName, getIngredientsOptions } from '../utils/ingredients';
import { getIngredientsById, IngredientType } from '../types/ingredients';
import { ProductsContext } from '../context/ProductsContext';

interface AddProductFormProps {
  onAddProduct: (product: ProductType) => void;
}

export default function AddProductForm({ onAddProduct }: AddProductFormProps): ReactElement {
  const [name, setName] = useState('Thunder Cock');
  const [price, setPrice] = useState<number | string>(420);
  const [baseProduct, setBaseProduct] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientType[]>([]);

  const productsContext = useContext(ProductsContext);
  if (!productsContext) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  const { products } = productsContext;

  // Get ingredients from context
  const ingredientsContext = useContext(IngredientsContext);
  if (!ingredientsContext) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  const { ingredients } = ingredientsContext;
  const ingredientsById = getIngredientsById(ingredients);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (name && price !== '' && selectedIngredients.length > 0) {
      const newProduct: ProductType = {
        id: `${cleanIngredientName(name)}_${Date.now().toString()}`,
        name,
        price,
        ingredients: selectedIngredients,
        baseProduct: baseProduct || undefined,
      };
      onAddProduct(newProduct);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        value={name}
        onChange={e => setName(e.currentTarget.value)}
        required
      />
      <NumberInput
        label="Price"
        value={price}
        onChange={value => setPrice(value)}
        required
        min={0}
      />
      <MultiSelect
        label="Ingredients"
        data={getIngredientsOptions(ingredients)}
        value={selectedIngredients.map(i => i.id)}
        onChange={(ingredientIds: string[]) => {
          const selected = ingredientIds
            .map(id => ingredientsById[id])
            .filter((ingredient): ingredient is IngredientType => Boolean(ingredient))
            .map(ingredient => ({
              id: ingredient.id,
              name: ingredient.name,
              image: ingredient.image,
            }));
          setSelectedIngredients(selected);
        }}
        hidePickedOptions
        searchable
        required
      />
      <Select
        label="Base Product"
        data={products.map(product => ({
          value: product.name,
          label: product.name,
        }))}
        value={baseProduct}
        onChange={setBaseProduct}
        clearable
      />
      <Button w="100%" type="submit" mt="md">
        <Text fw="bold" size="md">
          Save Product
        </Text>
      </Button>
    </form>
  );
}
