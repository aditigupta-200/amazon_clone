
import { CartList } from '@/components/cart/CartList';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {

  const { clearCart } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList />
        </div>
       <button 
  onClick={clearCart} 
  className="bg-red-500 text-white p-2 rounded w-40 h-12"
>
  Clear Cart
</button>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}