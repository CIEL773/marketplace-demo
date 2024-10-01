import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "../features/usersSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cart from "./Cart";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Navbar,
  Nav,
} from "react-bootstrap";
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
    <Navbar expand="lg" className="bg-light fixed-top border-bottom">
      <Container fluid>
        {/* Management Logo */}
        <Navbar.Brand as={Link} to="/" className="text-body-secondary col-lg-4">
          <h3>Management</h3>
        </Navbar.Brand>

        {/* Toggle Button for Small Screens */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="ms-auto"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Row className="w-100">
            <Col xs={12} sm={8} md={6} lg={6} className="mb-2 mb-md-0">
              {/* Search Bar for larger screens */}
              <Form
                className="d-none d-lg-flex"
                onSubmit={(e) => e.preventDefault()}
              >
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
                  disabled={signoutLoading} // Disable button when signing out
                >
                  Search
                </Button>

              </Form>
              {/* Search Bar for Small Screens */}
              <Form className="d-lg-none" onSubmit={(e) => e.preventDefault()} >
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outline-primary"
                  type="submit"
                  onClick={handleSearchClick}
                  disabled={signoutLoading} // Disable button when signing out
                >
                  Search
                </Button>
              </Form>
            </Col>

            {/* User Profile / Auth Buttons */}
            <Col xs={12} sm={4} md={6} lg={6} className="text-center text-md-end">
              {userInfo ? (
                <>
                  <Link to="/profile" className="me-2">
                    <Image
                      src={
                        userInfo.avatar ||
                        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      }
                      alt="User Avatar"
                      roundedCircle
                      style={{ width: "45px", height: "45px" }}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
