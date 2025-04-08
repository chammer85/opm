import defaultImage from '../assets/products/baby-blue/baby-blue-icon.png';
import { Card, Image, Text, CloseButton, useMantineTheme } from '@mantine/core';
import { ProductType } from '../types/products';
import { useMediaQuery } from '@mantine/hooks';
import ProductIngredients from './ProductIngredients';
import { ReactElement, useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

interface ProductProps {
  product: ProductType;
  onSelectProduct: (product: ProductType) => void;
}

export default function Product({ product, onSelectProduct }: ProductProps): ReactElement {
  const theme = useMantineTheme();
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const backgroundColor = prefersDarkScheme ? theme.colors.dark[7] : theme.colors.blue[6];

  const productsContext = useContext(ProductsContext);
  if (!productsContext) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  const { deleteProduct } = productsContext;


  return (
    <Card
      key={product.id}
      shadow="sm"
      p="lg"
      onClick={() => onSelectProduct(product)}
      style={{
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <Card.Section
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Image
          src={product.image || defaultImage}
          height={120}
          alt={product.name}
          style={{
            objectFit: 'contain',
          }}
        />
      </Card.Section>
      <Text size="lg" mt="sm" fw="bold">
        {product.name}
      </Text>
      <Text size="md">${product.price}</Text>
      <ProductIngredients product={product} />
      <CloseButton
        variant='transparent'
        size="xl"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = theme.colors.red[6];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          deleteProduct(product.id);
        }}
      />
    </Card>
  );
}
