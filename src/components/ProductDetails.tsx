import defaultImage from '../assets/products/baby-blue/baby-blue-icon.png';
import { Text, Image, useMantineTheme } from '@mantine/core';
import { ProductType } from '../types/products';
import { useMediaQuery } from '@mantine/hooks';
import ProductIngredients from './ProductIngredients';

interface ProductDetailsProps {
  product: ProductType;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const theme = useMantineTheme();
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const backgroundColor = prefersDarkScheme ? theme.colors.dark[8] : theme.colors.blue[6];

  return (
    <div>
      <Image
        src={product.image || defaultImage}
        width={120}
        height={120}
        alt={product.name}
        style={{
          backgroundColor: backgroundColor,
          objectFit: "contain"
        }}
      />
      <Text size="xl" mt="sm" fw="bold">
        {product.name}
      </Text>
      <Text size="lg">
        Price: ${product.price}
      </Text>
      <Text size="lg" my="sm" fw="bold">
        Ingredients:
      </Text>
      <ProductIngredients product={product} stacked={true}/>
    </div>
  );
}
