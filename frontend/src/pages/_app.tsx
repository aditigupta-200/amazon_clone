// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';
import { CartProvider } from '@/context/CardContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // Wrap everything with AuthProvider
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        </div>
        </ProductProvider>
        </CartProvider>
    </AuthProvider>
  );
};

export default App;
