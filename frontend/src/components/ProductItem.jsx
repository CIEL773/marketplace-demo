// src/components/ProductItem.jsx
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
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    <strong>Price: </strong> ${product.price}
                </Card.Text>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Button variant="primary" onClick={() => onAddToCart(product)}>
                    Add
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
