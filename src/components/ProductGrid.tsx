import { SimpleGrid } from '@mantine/core';
import { ProductType } from '../types/products';
import Product from './Product';
import { ReactElement } from 'react';

interface ProductGridProps {
  products: ProductType[];
  onSelectProduct: (product: ProductType) => void;
}

export default function ProductGrid({ products, onSelectProduct }: ProductGridProps): ReactElement {
  return (
    <SimpleGrid cols={4} spacing="lg">
      {products.map((product, key) => (
        <Product key={key} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </SimpleGrid>
  );
}
