import {
  SimpleGrid,
} from '@mantine/core';
import type {ProductType} from '../types';
import Product from './Product';

interface ProductGridProps {
  products: ProductType[];
  onSelectProduct: (product: ProductType) => void;
}

export default function ProductGrid({
  products,
  onSelectProduct
}: ProductGridProps) {
  return (
    <SimpleGrid cols={4} spacing="lg">
      {products.map((product, key) => (
        <Product key={key} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </SimpleGrid>
  )
}

