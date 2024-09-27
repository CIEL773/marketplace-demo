import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CartItem({ product, onIncreaseQuantity, onDecreaseQuantity }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card className="mb-3 shadow-sm" onClick={handleViewDetails}>
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <Card.Img
              variant="top"
              src={product.image || "https://picsum.photos/150"}
              alt={product.name}
            />
          </Col>
          <Col>
            <Card.Title className="text-muted" as={Col}>
              {product.name}
            </Card.Title>
            <Card.Text>
              <strong>${product.price}</strong>
            </Card.Text>

            {/* Display the current quantity */}
            <Card.Text>
              Quantity: <strong>{product.quantity}</strong>
            </Card.Text>

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              {/* Increase quantity (+1) */}
              <Button
                className="w-50 me-2"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onIncreaseQuantity(product);
                }}
              >
                +
              </Button>

              {/* Decrease quantity (-1) */}
              <Button
                className="w-50"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecreaseQuantity(product);
                }}
              >
                -
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
