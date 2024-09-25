import React, { useState, useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get product by productId
  useEffect(() => {
    axios.get(`http://localhost:4000/api/products/getProduct/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  // console.log(product);

  return (
    <div className="container col-xxl-8 px-4 py-5">
      {/* <div class="row flex-lg-row-reverse align-items-center g-5 py-5"> */}
      {/* <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="..."
            class="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </div> */}
      <div className="col-lg-6">
        <p>{product.category}</p>
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          {product.name}
        </h1>
        <img src={product.image || 'https://picsum.photos/350'} alt={product.name} className="img-fluid mb-3" />
        <p><strong>Price:</strong> ${product.price}</p>
        <p className="badge bg-danger bg-opacity-10 text-danger border-none border-danger px-2 py-2 fs-6 fw-normal">{product.stock === 0 ? "Out of stock" : <>The Last {product.stock}</>}</p>
        <p className="lead">
          {product.description}
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
            Add to cart
          </button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">
            Edit
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductDetail;
