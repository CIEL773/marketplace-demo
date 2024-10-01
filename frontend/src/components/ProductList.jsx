import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  useEffect(() => {
    dispatch(fetchProducts());
    // console.log("Dispatched fetchProducts action");
  }, [dispatch]);

  // Calculate the indexes for the products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2>Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}

      <div className="row">
        {currentProducts.map((product) => (
          <div key={product._id} className="col-lg-4 col-md-6">
            <ProductItem product={product} />
          </div>
        ))}
      </div>

      <div className="pagination-container mt-4 d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
