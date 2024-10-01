import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../features/productsSlice';
import { useLocation } from 'react-router-dom';
import ProductItem from './ProductItem';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const dispatch = useDispatch();
  const query = useQuery().get('query');

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }
  }, [dispatch, query]);

  // console.log(query);
  // console.log(products);

  return (
    <div className="container">
      <h2>Search Results</h2>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className="row">
        {products.length === 0 && !loading && (
          <p>No products found for "{query}"</p>
        )}
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
