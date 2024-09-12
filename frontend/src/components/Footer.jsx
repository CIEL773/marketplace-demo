import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS

const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <i className="fas fa-home" style={{ fontSize: "24px" }}></i>{" "}
            {/* Home Icon */}
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            &copy; 2024 Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fab fa-twitter" style={{ fontSize: "24px" }}></i>{" "}
              {/* Twitter Icon */}
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fab fa-instagram" style={{ fontSize: "24px" }}></i>{" "}
              {/* Instagram Icon */}
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fab fa-facebook" style={{ fontSize: "24px" }}></i>{" "}
              {/* Facebook Icon */}
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
