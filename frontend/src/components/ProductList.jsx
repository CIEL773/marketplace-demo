import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend API
        axios.get('http://localhost:4000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    return (
        <div className="container">
            <h2>Products</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4">
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
