import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductsProvider } from './providers/ProductsProvider';
import App from './App';
import './index.css';
import '@mantine/core/styles.css';
import { IngredientsProvider } from './providers/IngredientsProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <IngredientsProvider>
        <App />
      </IngredientsProvider>
    </ProductsProvider>
  </StrictMode>,
);
