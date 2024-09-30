import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { updateCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  const onAddToCart = (product) => {
    const cartData = {
      productId: product._id,
      quantity: 1,
    };
    dispatch(updateCart(cartData));
  };

  const onEdit = () => {
    navigate(`/editproduct/${product._id}`);
    // console.log("product", product);
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image || "https://picsum.photos/150"}
        alt={product.name}
        onClick={handleViewDetails}
      />
      <Card.Body>
        <Card.Title className="text-muted">{product.name}</Card.Title>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <Button
            className="w-50 me-2"
            variant="primary"
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
          {userInfo &&
            userInfo.role === "vendor" &&
            product.vendor === userInfo.id && (
              <Button
                className="w-50"
                variant="light"
                onClick={() => onEdit(product)}
              >
                Edit
              </Button>
            )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
