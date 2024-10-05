import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { Provider } from "react-redux";
import {store} from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <HelmetProvider>
          <App />
          <Toaster />
        </HelmetProvider>
      </Provider>

    </BrowserRouter>
  </StrictMode>
)
