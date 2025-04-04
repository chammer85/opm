import { SimpleGrid } from '@mantine/core';
import { ProductType } from '../types/products';
import Product from './Product';
import { ReactElement } from 'react';

interface ProductGridProps {
  products: ProductType[];
  onSelectProduct: (product: ProductType) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function ProductGrid({ products, onSelectProduct, onDeleteProduct }: ProductGridProps): ReactElement {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {products.map((product, key) => (
        <Product key={key} product={product} onSelectProduct={onSelectProduct} onDeleteProduct={onDeleteProduct} />
      ))}
    </SimpleGrid>
  );
}
