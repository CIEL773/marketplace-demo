import React from "react";
import EditProductForm from "../components/EditProductForm";
import { useParams } from "react-router-dom"; // Import for routing
import { useSelector } from "react-redux"; // Import to access the Redux store

const EditProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = useSelector((state) =>
    state.product.products.find((p) => p.id === id)
  ); // Get the product from Redux store based on ID

  if (!product) {
    return <div>Product not found!</div>; // Handle product not found case
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <EditProductForm product={product} />
    </div>
  );
};

export default EditProductPage;
