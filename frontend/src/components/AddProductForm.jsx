import React,{useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {createProduct} from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const AddProductForm = ()=>{
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  const [product, setProduct] = useState({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      imageUrl: '',
    })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(createProduct(product));
  };


      return (
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Enter product category"
            value={product.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group  as={Col} controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group  as={Col} controlId="formProductStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              placeholder="Enter product stock"
              value={product.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="formProductImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            placeholder="Enter product image URL"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
      )
}

export default AddProductForm;