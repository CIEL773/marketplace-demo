import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../features/cartSlice";
import { fetchProductById } from "../features/productsSlice";
import CartItem from "./CartItem";

function Cart() {
  // handle offcanvas status
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handle dispatch cart data
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const [fetchedProducts, setFetchedProducts] = useState([]);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCart()); // Fetch the cart when the component mounts
  }, [dispatch]);

  // fetch product details based on cartItems
  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems.length > 0) {
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
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };

    fetchProducts();
  }, [cartItems, dispatch]);

  // Handle increasing the quantity (+1)
  const handleIncreaseQuantity = (product) => {
    const updatedCart = fetchedProducts.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    // console.log("updatedCart", updatedCart);
    dispatch(updateCart(updatedCart));
  };

  // Handle decreasing the quantity (-1)
  const handleDecreaseQuantity = (product) => {
    // const updatedCart = fetchedProducts.map((item) =>
    //   item._id === product._id && item.quantity > 1
    //     ? { ...item, quantity: item.quantity - 1 }
    //     : item
    // );
    // dispatch(updateCart(updatedCart));
  };

  console.log("cartItems", cartItems);
  console.log("cartItems", typeof cartItems);
  console.log("Is cartItems an array?", Array.isArray(cartItems));
  console.log("fetchedProducts", fetchedProducts);

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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
