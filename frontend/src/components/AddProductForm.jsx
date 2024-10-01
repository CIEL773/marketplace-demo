import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { createProduct, resetAddedSuccess } from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error, addedSuccess } = useSelector(
    (state) => state.product
  );

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [showAlert, setShowAlert] = useState(false); // Alert state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to create the product (vendor ID will be handled by the createProduct function)
    dispatch(createProduct(product));

    // Reset form fields after submission
    setProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      imageUrl: "",
    });
  };

  // handle successfully added alert
  useEffect(() => {
    if (addedSuccess) {
      // Show the success alert when the product is added
      setShowAlert(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
        dispatch(resetAddedSuccess()); // Reset success state in Redux
      }, 2000);
    }
  }, [addedSuccess, dispatch]);

  return (
    <Form onSubmit={handleSubmit} className="col-md-5 mx-auto">
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
        <Form.Group as={Col} controlId="formProductPrice">
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

        <Form.Group as={Col} controlId="formProductStock">
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

      <Form.Group className="mb-3" controlId="formProductImagePreview">
        <Form.Label>Image Preview</Form.Label>
        {product.imageUrl ? (
          <div>
            <img
              src={product.imageUrl}
              alt="Product Preview"
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}
            />
          </div>
        ) : (
          <p>No image to preview</p>
        )}
      </Form.Group>

      {/* Show success alert */}
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Product added successfully!
        </Alert>
      )}

      {/* Show loading or error feedback */}
      {loading ? (
        <Button variant="primary" disabled>
          Adding Product...
        </Button>
      ) : (
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      )}

      {error && (
        <p className="text-danger mt-2">
          Error: {error.message ? error.message : error}
        </p>
      )}
    </Form>
  );
};

export default AddProductForm;
