import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  return (
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div class="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            class="d-inline-flex link-body-emphasis text-decoration-none"
            className="text-body-secondary text-decoration-none"
          >
            <h3>Managment</h3>
          </a>
        </div>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            class="form-control form-control-light text-bg-light"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-outline-primary me-2">
            Login
          </button>
          <button type="button" class="btn btn-outline-primary me-2">
            Sign-up
          </button>
          <Link to="/cart" className="text-decoration-none me-2">
            <i className="fas fa-shopping-cart fa-lg"></i>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
