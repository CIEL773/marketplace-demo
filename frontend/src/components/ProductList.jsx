import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import {fetchProducts} from  "../features/productsSlice";
import {useDispatch, useSelector} from "react-redux";


const ProductList = () => {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     // Fetch products from the backend API
    //     axios.get('http://localhost:4000/api/products')
    //         .then(response => {
    //             setProducts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the products!', error);
    //         });
    // }, []);

    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state => state.product));
    useEffect(()=>{
        dispatch(fetchProducts());
        // console.log("Dispatched fetchProducts action");
    }, [dispatch]);

    return (
        <div className="container">
            <h2>Products</h2>
            
            {/* Show loading or error messages */}
            {loading && <p>Loading products...</p>}
            {error && <p>Error: {error}</p>}

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
