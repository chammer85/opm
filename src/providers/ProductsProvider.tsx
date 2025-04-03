import { useState, ReactNode } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { ProductType } from '../types/products';
import { SORT_ORDERS, SortOrderType } from '../constants/sortOptions';

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [ products, setProducts ] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("products");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [ sortOrder, setSortOrder ] = useState<SortOrderType>(SORT_ORDERS.DESCENDING);

  // Automatically sort products when sorting order changes
  const sortedProducts = [ ...products ].sort((a, b) => {
    return sortOrder === SORT_ORDERS.DESCENDING
      ? Number(b.price) - Number(a.price)
      : Number(a.price) - Number(b.price);
  });

  return (
    <ProductsContext.Provider value={{
      products: sortedProducts,
      setProducts,
      sortOrder,
      setSortOrder
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
