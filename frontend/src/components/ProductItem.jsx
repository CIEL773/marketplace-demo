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
  const { cartItems } = useSelector((state) => state.cart);

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  const onAddToCart = (product) => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    const existingCartItem = items.find((item) => item.productId === product._id);

    if (existingCartItem) {
      // If the product is already in the cart, increase its quantity by 1
      const updatedItem = {
        productId: product._id,
        quantity: existingCartItem.quantity + 1,
      };
      dispatch(updateCart(updatedItem));
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const newItem = {
        productId: product._id,
        quantity: 1,
      };
      dispatch(updateCart(newItem));
    };
  };

  const onEdit = () => {
    navigate(`/editproduct/${product._id}`);
    // console.log("product", product);
  };

  return (
    <Card className="mb-3 shadow-sm ">
      <Card.Img
        variant="top"
        style={{
          width: "100%",        // Make the image fill the card's width
          height: "auto",      // Maintain aspect ratio
          aspectRatio: "1 / 1", // Keep the image square
          objectFit: "cover"   // Cover the entire area without distortion
        }}
        src={product.imageUrl || "https://picsum.photos/150"}
        alt={product.name}
        onClick={handleViewDetails}
      />
      <Card.Body>
        <Card.Title className="text-muted">{product.name}</Card.Title>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <div className="d-grid gap-2 d-flex justify-content-md-start justify-content-center">
          <Button
            className="w-25 me-2"
            variant="primary"
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
          {userInfo &&
            userInfo.role === "vendor" &&
            product.vendor === userInfo.id && (
              <Button
                className="w-25"
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
