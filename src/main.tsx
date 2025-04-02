import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ProductProvider } from './providers/ProductProvider';
import './index.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductProvider>
      <App/>
    </ProductProvider>
  </StrictMode>,
)
