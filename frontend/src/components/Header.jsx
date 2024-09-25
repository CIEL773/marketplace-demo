import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "../features/usersSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cart from "./Cart";
// import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      dispatch(signoutUser());
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none text-body-secondary"
          >
            <h3>Management</h3>
          </a>
        </div>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            className="form-control form-control-light text-bg-light"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div className="col-md-3 text-end">
          {userInfo ? (
            <>
              <Link to="/profile" className="me-2">
                <img
                  src={userInfo.avatar || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
              <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={handleSignout}
              >
                Sign-out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button type="button" className="btn btn-outline-primary me-2">
                  Sign-in
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-outline-primary me-2">
                  Sign-up
                </button>
              </Link>
            </>
          )}
          {/* <Link to="/cart" className="text-decoration-none me-2">
            <i className="fas fa-shopping-cart fa-lg"></i>
          </Link> */}
          <Cart />
        </div>
      </header>
    </div>
  );
};

export default Header;
