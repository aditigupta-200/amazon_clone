// import { useCart } from "../context/CardContext";
// import CartItem from "../components/CartItem";

// export default function Cart() {
//   const { cart } = useCart(); // ✅ Now properly typed

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cart.map((item) => <CartItem key={item._id} item={item} />)
//       )}
//     </div>
//   );
// }
// src/pages/cart.tsx
import { CartList } from '@/components/cart/CartList';
import { CartSummary } from '@/components/cart/CartSummary';

export default function CartPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CartList />
        <CartSummary />
      </div>
    </div>
  );
}