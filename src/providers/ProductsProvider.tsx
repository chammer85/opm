import { useState, ReactNode, ReactElement } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { ProductType } from '../types/products';
import { SORT_ORDERS, SortOrderType } from '../constants/sortOptions';

export const ProductsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('products');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [sortOrder, setSortOrder] = useState<SortOrderType>(SORT_ORDERS.DESCENDING);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // Delete product by id and clear selected product if it matches deleted product
  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((product) => product.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
      return updatedProducts;
    });

    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  // Automatically sort products when sorting order changes
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === SORT_ORDERS.DESCENDING
      ? Number(b.price) - Number(a.price)
      : Number(a.price) - Number(b.price);
  });

  return (
    <ProductsContext.Provider
      value={{
        products: sortedProducts,
        setProducts,
        sortOrder,
        setSortOrder,
        deleteProduct,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
