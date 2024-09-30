import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { updateProduct, resetAddedSuccess } from "../features/productsSlice"; // Import updateProduct
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const EditProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const { loading, error, addedSuccess } = useSelector(
    (state) => state.product
  );
  const { userInfo } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl,
  });

  const [showAlert, setShowAlert] = useState(false); // Alert state

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("origin data", formData);
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log("new data", formData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to update the product
    dispatch(
      updateProduct({
        id: product._id,
        productData: { vendor: userInfo.id, ...formData },
      })
    );
    // console.log("new data", {
    //   id: product._id,
    //   vendor: userInfo.id,
    //   ...formData,
    // });
    // console.log("addedSuccess", addedSuccess);

    // Reset form fields after submission (if desired)
  };

  // Handle successfully updated alert
  useEffect(() => {
    if (addedSuccess) {
      // Show the success alert when the product is updated
      setShowAlert(true);

      // Hide the alert after 2 seconds
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
          value={formData.name}
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
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProductCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          placeholder="Enter product category"
          value={formData.category}
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
            value={formData.price}
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
            value={formData.stock}
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
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Show success alert */}
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Product updated successfully!
        </Alert>
      )}

      {/* Show loading or error feedback */}
      {loading ? (
        <Button variant="primary" disabled>
          Updating Product...
        </Button>
      ) : (
        <Button variant="primary" type="submit">
          Update Product
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

export default EditProductForm;
