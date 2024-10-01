import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
    // console.log("Dispatched fetchProducts action");
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-12 col-md-6 col-lg-4">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
