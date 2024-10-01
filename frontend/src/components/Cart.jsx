import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../features/cartSlice";
import { fetchProductById } from "../features/productsSlice";
import CartItem from "./CartItem";
// import SalesTax from "sales-tax";

// // Set tax origin country to the US
// salesTax.setTaxOriginCountry('US');

function Cart() {
  // handle offcanvas status
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handle dispatch cart data
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const [fetchedProducts, setFetchedProducts] = useState([]);
  // const { products } = useSelector((state) => state.product);
  const [selectedState, setSelectedState] = useState(""); // New state for selected location
  const [taxRate, setTaxRate] = useState(0); // New state for tax rate

  useEffect(() => {
    dispatch(getCart()); // Fetch the cart when the component mounts
  }, [dispatch]);

  // fetch product details based on cartItems
  useEffect(() => {
    const fetchProducts = async () => {
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        try {
          const productFetchPromises = cartItems.map((item) => {
            // Dispatch fetchProductById for each productId
            return dispatch(fetchProductById(item.productId)).unwrap();
          });

          const products = await Promise.all(productFetchPromises); // Resolve all promises

          // combine product details with cart item quantities
          const cartWithDetails = cartItems.map((cartItem) => {
            const productDetails = products.find(
              (product) => product._id === cartItem.productId
            );
            return { ...productDetails, quantity: cartItem.quantity };
          });
          setFetchedProducts(cartWithDetails); // Set the fetched product details
          console.log("cartWithDetails", cartWithDetails);
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };

    fetchProducts();
  }, [cartItems, dispatch]);

  // Handle increasing the quantity (+1)
  const handleIncreaseQuantity = (product) => {
    const updatedItem = {
      productId: product._id,
      quantity: product.quantity + 1,
    };
    // console.log("Updated item:", updatedItem);
    dispatch(updateCart(updatedItem));
  };

  // Handle decreasing the quantity (-1)
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedItem = {
        productId: product._id,
        quantity: product.quantity - 1,
      };
      // console.log("Updated item:", updatedItem);
      dispatch(updateCart(updatedItem));
    } else {
      const updatedItem = {
        productId: product._id,
        quantity: 0,
      };
      // console.log("Updated item:", updatedItem);
      dispatch(updateCart(updatedItem));
    }
  };

  // handle total amount
  const totalAmount = fetchedProducts.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // handle total price
  // async function calculateTax(zipCode) {
  //   const rate = await salesTax.getSalesTax('US', zipCode);
  //   console.log(`Tax rate for ${zipCode}: ${rate}`);
  // }
  // calculateTax('90210');

  const totalPrice = fetchedProducts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // State tax rates
  const stateTaxRates = {
    CA: 0.0725, // California 7.25%
    NY: 0.04, // New York 4%
    TX: 0.0625, // Texas 6.25%
    FL: 0.06, // Florida 6%
    IL: 0.0625, // Illinois 6.25%
    // Add more states as needed
  };

  // Handle state selection change
  const handleStateChange = (event) => {
    const selected = event.target.value;
    setSelectedState(selected);
    setTaxRate(stateTaxRates[selected] || 0); // Set tax rate based on selected state
  };
  // Calculate the total price after tax
  const totalPriceWithTax = totalPrice * (1 + taxRate);

  // console.log("cartItems", cartItems);
  // console.log("cartItems", typeof cartItems);
  // console.log("Is cartItems an array?", Array.isArray(cartItems));
  // console.log("fetchedProducts", fetchedProducts);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <i className="fas fa-shopping-cart fa-lg"></i>
        <Badge bg="danger">{totalAmount}</Badge>
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
          ) : (fetchedProducts && !Array.isArray(fetchedProducts)) ||
            fetchedProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul style={{ padding: 0, listStyle: "none" }}>
              {fetchedProducts.map((item) => (
                <li key={item._id} style={{ marginBottom: "15px" }}>
                  <CartItem
                    product={item} // Pass product details with quantity
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className="text-center">
            <h4> Total Price: ${totalPrice.toFixed(2)}</h4>

            <Form.Group className="mb-3">
              <Form.Label>Select your state for tax calculation:</Form.Label>
              <Form.Select
                aria-label="Select state"
                onChange={handleStateChange}
              >
                <option value="">--Select State--</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
                {/* Add more states as options */}
              </Form.Select>
            </Form.Group>

            <h4>After Tax: ${totalPriceWithTax.toFixed(2)}</h4>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
