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
    <SimpleGrid
      cols={{ base: 1, lg: 2, xl: 3 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {products.map((product, key) => (
        <Product key={key} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </SimpleGrid>
  );
}
