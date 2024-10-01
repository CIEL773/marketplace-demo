import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/usersSlice"; // Import the signup action
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const SignupPage = () => {
  const { userInfo, loading, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   if (success) navigate("/");
  // }, [navigate, userInfo, success]);

  useEffect(() => {
    if (success) {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [success, navigate]);

  // Handle form submission
  const submitForm = (data) => {
    dispatch(signupUser(data));
  };

  return (
    <div>
      <main className="form-signin col-lg-3 m-auto">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          {/* Name field*/}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              name="name"
              {...register("name")}
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
              {...register("email")}
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
              {...register("password", { required: true, minLength: 6 })}
              required
            />
            <label htmlFor="floatingPassword">Password <span style={{ fontSize: '0.8rem', color: 'gray' }}>(at least 6 digits)</span></label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>

          {/* User type select */}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="User Type"
              name="userType"
              {...register("role")}
              required
            >
              <option value="" disabled>
                Please select
              </option>
              <option value="vendor">Vendor</option>
              <option value="user">Customer</option>
            </select>
            <label htmlFor="floatingSelect">User Type</label>
          </div>

          {/* Sign up button */}
          <button
            className="btn btn-primary w-100 py-2 "
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {errors.confirmPassword && (
            <div className="alert alert-danger mt-3">
              {errors.confirmPassword.message}
            </div>
          )}
        </form>

        {/* Success Alert */}
        {showAlert && (
          <Alert variant="success" className="mt-3">
            You have successfully signed up! Redirecting to the home page...
          </Alert>
        )}
      </main>
    </div>
  );
};

export default SignupPage;
