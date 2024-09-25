import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../features/cartSlice";

function Cart() {
  // handle offcanvas status
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handle dispatch cart data
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart()); // Fetch the cart when the component mounts
  }, [dispatch]);

  const handleUpdateCart = (updatedCart) => {
    dispatch(updateCart(updatedCart)); // Update the cart with new items/quantities
  };

  console.log("cartItems", cartItems);
  console.log("cartItems", typeof cartItems);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <i className="fas fa-shopping-cart fa-lg"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" scroll="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : cartItems && !Array.isArray(cartItems) ||cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul style={{ padding: 0, listStyle: "none" }}>
              {cartItems.map((item) => (
                <li key={item._id} style={{ marginBottom: "15px" }}>
                  <p>{item.productId}</p>
                </li>
              ))}
            </ul>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function itemCard(product) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card className="mb-3 shadow-sm" onClick={handleViewDetails}>
      <Row className="mb-3">
        <Card.Img
          variant="top"
          as={Col}
          src={product.image || "https://picsum.photos/150"}
          alt={product.name}
        />
        <Card.Body as={Col}>
          <Card.Title className="text-muted" as={Col}>
            {product.name}
          </Card.Title>
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
            <Button
              className="w-50"
              variant="light"
              onClick={() => onRemove(product)}
            >
              Remove
            </Button>
          </div>
        </Card.Body>
      </Row>
    </Card>
  );
}

export default Cart;
