import defaultImage from '../assets/products/baby-blue/baby-blue-icon.png';
import { Card, Image, Text, Button, useMantineTheme } from '@mantine/core';
import { ProductType } from '../types/products';
import { useMediaQuery } from '@mantine/hooks';
import ProductIngredients from './ProductIngredients';
import { ReactElement } from 'react';

interface ProductProps {
  product: ProductType;
  onSelectProduct: (product: ProductType) => void;
  onDeleteProduct: (productId: string) => void; // Add this prop
}

export default function Product({ product, onSelectProduct, onDeleteProduct }: ProductProps): ReactElement {
  const theme = useMantineTheme();
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const backgroundColor = prefersDarkScheme ? theme.colors.dark[7] : theme.colors.blue[6];

  return (
    <Card
      key={product.id}
      shadow="sm"
      p="lg"
      onClick={() => onSelectProduct(product)}
      style={{
        cursor: 'pointer',
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
      <Button
        color="red"
        size="xs"
        mt="sm"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card's onClick
          onDeleteProduct(product.id);
        }}
      >
        DELETE
      </Button>
    </Card>
  );
}
