// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // Wrap everything with AuthProvider
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
