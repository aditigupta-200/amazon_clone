// frontend/pages/products/add.tsx
import ProductForm from '../../components/ProductForm';

const AddProductPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
      <ProductForm />
    </div>
  );
};

export default AddProductPage;