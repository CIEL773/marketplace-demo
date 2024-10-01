import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // handle add to cart
  const onAddToCart = (product) => {
    const cartData = {
      productId: product._id,
      quantity: 1,
    };
    dispatch(updateCart(cartData));
  };

  // handle edit
  const onEdit = () => {
    navigate(`/editproduct/${product._id}`);
    // console.log("product", product);
  };

  // Get product by productId
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/getProduct/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
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
      <div className="container">
        <Row className="d-flex align-items-center">
          <Col lg={6}>
            <p>{product.category}</p>
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              {product.name}
            </h1>
            <img
              src={product.imageUrl || "https://picsum.photos/350"}
              alt={product.name}
              className="img-fluid mb-3"
            />
          </Col>

          <Col lg={6}>
            <h5>
              <strong>Price:</strong> ${product.price}
            </h5>
            <p className="badge bg-danger bg-opacity-10 text-danger border-none border-danger px-2 py-2 fs-6 fw-normal">
              {product.stock === 0 ? (
                "Out of stock"
              ) : (
                <>The Last {product.stock}</>
              )}
            </p>
            <p className="lead">{product.description}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Button
                variant="primary"
                size="lg"
                className="px-4 me-md-2"
                onClick={() => onAddToCart(product)}
              >
                Add to cart
              </Button>
              {userInfo &&
                userInfo.role === "vendor" &&
                product.vendor === userInfo.id && (
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="px-4"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </Button>
                )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
