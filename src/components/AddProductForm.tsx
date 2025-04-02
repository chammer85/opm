import type React from "react";
import { useState } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  MultiSelect
} from '@mantine/core';
import type {ProductType, Ingredient} from '../types';
import { getIngredients } from '../data/BaseIngredients';

interface AddProductFormProps {
  onAddProduct: (product: ProductType) => void;
  products: ProductType[];
}

export default function AddProductForm({
  onAddProduct,
  products
}: AddProductFormProps) {
  const [name, setName] = useState("Thunder Cock");
  const [price, setPrice] = useState<number | string>(420);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseProduct, setBaseProduct] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price !== '' && ingredients.length > 0) {
      const newProduct: ProductType = {
        id: Date.now().toString(),
        name,
        price,
        ingredients,
        baseProduct: baseProduct || undefined,
      }
      onAddProduct(newProduct);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        required
      />
      <NumberInput
        label="Price"
        value={price}
        onChange={(value) => setPrice(value)}
        required min={0}
      />
      <MultiSelect
        label="Ingredients"
        data={getIngredients()}
        value={ingredients.map((i) => i.name)}
        onChange={(values) => setIngredients(values.map((v) => ({
          id: v,
          name: v,
          quantity: 1
        })))}
        hidePickedOptions
        searchable
        required
      />
      <Select
        label="Base Product"
        data={products.map((product) => ({
          value: product.name,
          label: product.name
        }))}
        value={baseProduct}
        onChange={setBaseProduct}
        clearable
      />
      <Button w="100%" type="submit" mt="md">
        Add Product
      </Button>
    </form>
  )
}

