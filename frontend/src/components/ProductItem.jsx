import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductItem = ({ product, onAddToCart }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/products/${product._id}`);
    };

    return (
        <Card className="mb-3 shadow-sm" onClick={handleViewDetails}>
            <Card.Img variant="top" src={product.image || 'https://picsum.photos/150'} alt={product.name} />
            <Card.Body>
                <Card.Title className="text-muted">{product.name}</Card.Title>
                <Card.Text>
                    <strong>${product.price}</strong>
                </Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <Button className="w-50 me-2" variant="primary" onClick={() => onAddToCart(product)}>
                        Add
                    </Button>
                    <Button className="w-50" variant="light" onClick={() => onEdit(product)}>
                        Edit
                    </Button>
                </div>

            </Card.Body>
        </Card>
    );
};

export default ProductItem;
