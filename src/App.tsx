import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { CartsPage } from './pages/CartsPage';
import { CartDetailPage } from './pages/CartDetailPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/carts/:id" element={<CartDetailPage />} />
          <Route path="/" element={<CartsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App