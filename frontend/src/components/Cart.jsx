import React, { useState, useEffect } from "react";
import { Button, Card, Badge, Offcanvas, Row, Col, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../features/cartSlice";
import { fetchProductById } from "../features/productsSlice";
import CartItem from "./CartItem";

function Cart() {
  const [show, setShow] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [taxRate, setTaxRate] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCart()); // Fetch the cart when the component mounts
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        try {
          const productFetchPromises = cartItems.map((item) =>
            dispatch(fetchProductById(item.productId)).unwrap()
          );
          const products = await Promise.all(productFetchPromises);
          const cartWithDetails = cartItems.map((cartItem) => {
            const productDetails = products.find(
              (product) => product._id === cartItem.productId
            );
            return { ...productDetails, quantity: cartItem.quantity };
          });
          setFetchedProducts(cartWithDetails);
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };
    fetchProducts();
  }, [cartItems, dispatch]);

  const handleIncreaseQuantity = (product) => {
    const updatedItem = { productId: product._id, quantity: product.quantity + 1 };
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


  const totalAmount = fetchedProducts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = fetchedProducts.reduce((total, item) => total + item.price * item.quantity, 0);

  const stateTaxRates = {
    AL: 0.04,   // Alabama
    AK: 0.0,    // Alaska (No state sales tax, but local taxes may apply)
    AZ: 0.056,  // Arizona
    AR: 0.065,  // Arkansas
    CA: 0.0725, // California
    CO: 0.029,  // Colorado
    CT: 0.0635, // Connecticut
    DE: 0.0,    // Delaware (No state sales tax)
    FL: 0.06,   // Florida
    GA: 0.04,   // Georgia
    HI: 0.04,   // Hawaii
    ID: 0.06,   // Idaho
    IL: 0.0625, // Illinois
    IN: 0.07,   // Indiana
    IA: 0.06,   // Iowa
    KS: 0.065,  // Kansas
    KY: 0.06,   // Kentucky
    LA: 0.0445, // Louisiana (Average state rate, local taxes vary)
    ME: 0.055,  // Maine
    MD: 0.06,   // Maryland
    MA: 0.0625, // Massachusetts
    MI: 0.06,   // Michigan
    MN: 0.06875,// Minnesota
    MS: 0.07,   // Mississippi
    MO: 0.04225,// Missouri
    MT: 0.0,    // Montana (No state sales tax)
    NE: 0.055,  // Nebraska
    NV: 0.0685, // Nevada
    NH: 0.0,    // New Hampshire (No state sales tax)
    NJ: 0.06625,// New Jersey
    NM: 0.05125,// New Mexico
    NY: 0.04,   // New York
    NC: 0.0475, // North Carolina
    ND: 0.05,   // North Dakota
    OH: 0.0575, // Ohio
    OK: 0.045,  // Oklahoma
    OR: 0.0,    // Oregon (No state sales tax)
    PA: 0.06,   // Pennsylvania
    RI: 0.07,   // Rhode Island
    SC: 0.06,   // South Carolina
    SD: 0.045,  // South Dakota
    TN: 0.07,   // Tennessee
    TX: 0.0625, // Texas
    UT: 0.0485, // Utah
    VT: 0.06,   // Vermont
    VA: 0.053,  // Virginia
    WA: 0.065,  // Washington
    WV: 0.06,   // West Virginia
    WI: 0.05,   // Wisconsin
    WY: 0.04    // Wyoming
  };
  

  useEffect(() => {
    if (userInfo?.address?.state) {
      const state = userInfo.address.state;
      setTaxRate(stateTaxRates[state] || 0);
    }
  }, [userInfo]);

  const totalPriceWithTax = totalPrice * (1 + taxRate);

  const handleUpdateProfileClick = () => {
    navigate("/updateaddress"); // Navigate to update profile page if no address
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Button variant="link" onClick={() => setShow(true)}>
        <i className="fas fa-shopping-cart fa-lg"></i>
        <Badge bg="danger">{totalAmount}</Badge>
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end" scroll="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : !fetchedProducts.length ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {fetchedProducts.map((item) => (
                  <li key={item._id} style={{ marginBottom: "15px" }}>
                    <CartItem
                      product={item}
                      onIncreaseQuantity={handleIncreaseQuantity}
                      onDecreaseQuantity={handleDecreaseQuantity}
                    />
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <h4>Total Price: ${totalPrice.toFixed(2)}</h4>

                {userInfo?.address?.state ? (
                  <div>
                    <h4>State: {userInfo.address.state}</h4>
                    <h4>After Tax: ${totalPriceWithTax.toFixed(2)}</h4>
                    <Button variant="primary" onClick={handleCheckoutClick}>
                      Proceed to Checkout
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p>Please update your address to calculate the tax.</p>
                    <Button variant="primary" onClick={handleUpdateProfileClick}>
                      Add Address
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
