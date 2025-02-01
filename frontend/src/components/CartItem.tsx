import { useCart } from "../context/CardContext";

interface CartItemProps {
  item: {
    _id: string;
    productId: { name: string; price: number; imageUrl: string };
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useCart(); // ✅ This is now properly typed

  return (
    <div className="flex items-center justify-between border p-4 rounded-lg shadow-md my-2">
      <div className="flex items-center space-x-4">
        <img src={item.productId.imageUrl} alt={item.productId.name} width="50" className="rounded-md" />
        <div>
          <h2 className="text-lg font-semibold">{item.productId.name}</h2>
          <p className="text-gray-600">${item.productId.price}</p>
        </div>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        onClick={() => removeFromCart(item._id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
