import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "../features/usersSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cart from "./Cart";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { searchProducts } from "../features/productsSlice";
import debounce from "lodash/debounce";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userInfo,
    loading: signoutLoading,
    error: signoutError,
  } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search for products, but without navigation
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        if (query.trim() !== "") {
          dispatch(searchProducts({ query }));
        }
      }, 500),
    [dispatch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutUser());
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  // useEffect(() => {
  //   if (userInfo === null) {
  //     // Only redirect when the userInfo becomes null (user signed out)
  //     navigate("/");
  //   }
  // }, [userInfo, navigate]);
  

  

//   useEffect(() => {
//     dispatch(signoutUser());
// }, [dispatch]);

  return (
    <Container fluid className="py-2 border-bottom bg-light fixed-top">
      <Row className="align-items-center">
        {/* Management Logo */}
        <Col
          xs={12}
          md={3}
          lg={4}
          className="mb-2 mb-md-0 text-center text-md-start"
        >
          <Link to="/" className="text-decoration-none text-body-secondary">
            <h3>Management</h3>
          </Link>
        </Col>

        {/* Search Bar */}
        <Col xs={12} md={4} lg={4} className="mb-2 mb-md-0">
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleInputChange}
              className="me-2"
            />
            <Button
              variant="outline-primary"
              type="submit"
              onClick={handleSearchClick}
              disabled={signoutLoading}  // Disable button when signing out
            >
              Search
            </Button>
          </Form>
        </Col>

        {/* User Profile / Auth Buttons */}
        <Col xs={12} md={5} lg={4} className="text-center text-md-end">
          {userInfo ? (
            <>
              <Link to="/profile" className="me-2">
                <Image
                  src={userInfo.avatar || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  roundedCircle
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={handleSignout}
              >
                Sign-out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline-primary" className="me-2">
                  Sign-in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-primary" className="me-2">
                  Sign-up
                </Button>
              </Link>
            </>
          )}
          <Cart />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
