import { useState, useContext, ReactElement } from 'react';
import {
  MantineProvider,
  AppShell,
  Box,
  Flex,
  Text,
  Button,
  ColorSchemeScript,
  Container,
  Space,
} from '@mantine/core';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import AddProductForm from './components/AddProductForm';
import SearchBar from './components/SearchBar';
import { ProductsContext } from './context/ProductsContext';
import { ProductType } from './types/products';

export default function App(): ReactElement {
  const productsContext = useContext(ProductsContext);
  if (!productsContext) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  const { products, setProducts } = productsContext;

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addProduct = (newProduct: ProductType): void => {
    setProducts([...products, newProduct]);
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    setShowAddForm(false);
  };

  const handleSelectProduct = (product: ProductType): void => {
    setSelectedProduct(product);
    setShowAddForm(false);
  };

  // Check product name, price, and ingredients
  const filteredProducts = products.filter(product => {
    const productIngredientsMatch = product.ingredients.some(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Function to check base product ingredients recursively
    const checkBaseProductIngredients = (currentProduct: ProductType): boolean => {
      const baseProduct = products.find(p => p.name === currentProduct.baseProduct);
      if (!baseProduct) {
        return false;
      } // No base product, stop recursion

      // Check ingredients of the base product
      const baseIngredientsMatch = baseProduct.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      // Recursively check base products
      return baseIngredientsMatch || checkBaseProductIngredients(baseProduct);
    };

    // Return true if any condition matches
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery) ||
      productIngredientsMatch ||
      checkBaseProductIngredients(product)
    );
  });

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <AppShell
          padding="lg"
          aside={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: true },
          }}
          header={{
            height: 60,
          }}
        >
          <AppShell.Header>
            <Container h={60} size="fluid" ps="lg" pe="0">
              <Flex gap="lg" justify="space-between" align="center" w="100%">
                <Box style={{ flex: '1 1 auto', maxWidth: 'calc(100% - 300px)' }}>
                  <SearchBar onSearch={setSearchQuery} />
                </Box>
                <Flex gap="lg" flex="0 0 300px" justify="center">
                  <Text fw="bold" size="lg">
                    Schedule One: OPM
                  </Text>
                </Flex>
              </Flex>
            </Container>
          </AppShell.Header>
          <AppShell.Aside p="lg">
            <Button
              style={{ display: !showAddForm ? 'block' : 'none' }}
              onClick={() => {
                setShowAddForm(true);
              }}
            >
              Add Product
            </Button>
            <Space style={{ display: !showAddForm ? 'block' : 'none' }} h="md" />
            {showAddForm ? (
              <AddProductForm onAddProduct={addProduct} products={products} />
            ) : selectedProduct ? (
              <ProductDetails product={selectedProduct} />
            ) : (
              <>
                <Text size="lg">
                  <strong>Product Details:</strong>
                </Text>
                <Text>Select a product to view details...</Text>
              </>
            )}
          </AppShell.Aside>
          <AppShell.Main>
            <ProductGrid products={filteredProducts} onSelectProduct={handleSelectProduct} />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}
