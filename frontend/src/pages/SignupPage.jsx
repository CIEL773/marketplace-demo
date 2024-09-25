import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/usersSlice"; // Import the signup action
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "", // Changed from 'username' to 'name'
    email: "",
    password: "",
    userType: ""
  });

  const { userInfo, loading, error } = useSelector((state) => state.user);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the signup action
    dispatch(signupUser(formData));
  };

  // Effect to handle navigation after signup
  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to homepage on successful signup
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <main className="form-signin col-lg-3 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          {/* Name field (previously Username) */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              name="name" // Changed from 'username' to 'name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>

          {/* Email address field */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          {/* Password field */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* User type select */}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="User Type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Please select
              </option>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </select>
            <label htmlFor="floatingSelect">User Type</label>
          </div>

          {/* Sign up button */}
          <button className="btn btn-primary w-100 py-2 " type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {error && <div className="alert alert-danger mt-3">{error.message || error}</div>}
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
