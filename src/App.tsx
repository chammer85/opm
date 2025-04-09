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
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons-react';

export default function App(): ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const productsContext = useContext(ProductsContext);
  if (!productsContext) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  const { products, setProducts, selectedProduct, setSelectedProduct } = productsContext;

  const [showAddForm, setShowAddForm] = useState(isMobile);
  const [searchQuery, setSearchQuery] = useState('');

  const addProduct = (newProduct: ProductType): void => {
    setProducts([...products, newProduct]);
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    setShowAddForm(false);
  };

  const handleCloseAside = (): void => {
    setShowAddForm(false);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product: ProductType): void => {
    setSelectedProduct(product);
    setShowAddForm(false);
  };

  const handleDeletedProduct = () => {
    setSelectedProduct(null);
  }

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
          w="100%"
          padding="lg"
          header={{
            height: isMobile && (showAddForm || selectedProduct) ? 0 : 60,
          }}
          aside={{
            width: 300,
            breakpoint: 'lg',
            collapsed: { mobile: !showAddForm && !selectedProduct },
          }}
        >
          <AppShell.Header
            style={{ display: isMobile && (showAddForm || selectedProduct) ? 'none' : 'block' }}
          >
            <Container size="fluid" ps="lg" pe={isMobile ? 'lg' : 0}>
              <Flex
                gap={isMobile ? 'xs' : 'lg'}
                justify={isMobile ? 'center' : 'space-between'}
                align="center"
                direction="row"
                w="100%"
              >
                <Box
                  style={{
                    flex: isMobile ? '100%' : '1 1 auto',
                    maxWidth: isMobile ? '100%' : 'calc(100% - 300px)',
                  }}
                >
                  <SearchBar onSearch={setSearchQuery} />
                </Box>
                <Flex gap="lg" flex={isMobile ? '0 0 auto' : '0 0 300px'} justify="center">
                  <Text fw="bold" size="lg" lh={1}>
                    <span hidden={isMobile}>Schedule One:</span> OPM
                  </Text>
                </Flex>
              </Flex>
            </Container>
          </AppShell.Header>
          <AppShell.Aside p="lg">
            <Button
              style={{ display: showAddForm || selectedProduct ? 'none' : 'block' }}
              onClick={() => {
                setShowAddForm(true);
              }}
            >
              Add Product
            </Button>
            <Flex
              w="100%"
              justify="flex-start"
              align="center"
              direction="row"
              style={{
                display: showAddForm || selectedProduct ? 'flex' : 'none',
                paddingBottom: '1rem',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--app-shell-border-color)',
              }}
              onClick={handleCloseAside}
            >
              <IconArrowLeft size={28} style={{ marginRight: '.5rem' }} />
              <Text size="lg" fw="bold">
                {showAddForm ? 'Add Product' : 'Product Details'}
              </Text>
            </Flex>
            <Space style={{ display: !showAddForm ? 'block' : 'none' }} h="md" />
            {showAddForm ? (
              <AddProductForm onAddProduct={addProduct} />
            ) : selectedProduct ? (
              <ProductDetails product={selectedProduct} />
            ) : (
              <Text>Select a product to view details...</Text>
            )}
          </AppShell.Aside>
          <AppShell.Main w="100%">
            <ProductGrid products={filteredProducts} onSelectProduct={handleSelectProduct} onDeleteProduct={handleDeletedProduct} />
          </AppShell.Main>
          <AppShell.Footer
            p="sm"
            hiddenFrom="md"
            style={{ display: showAddForm || selectedProduct ? 'none' : 'block' }}
          >
            <Button
              w="100%"
              onClick={() => {
                setShowAddForm(true);
              }}
            >
              Add Product
            </Button>
          </AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </>
  );
}
