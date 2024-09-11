import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SignupPage = () => {
  return (
    <div>
      <main className="form-signin col-lg-3 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          {/* Username field */}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Username"
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>

          {/* Email address field */}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          {/* Password field */}
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Default select example"
            >
              <option value="" disabled selected>
                Please select
              </option>
              <option value="1">Vendor</option>
              <option value="2">Customer</option>
            </select>
            <label htmlFor="floatingSelect">User Type</label>
          </div>

          {/* Sign up button */}
          <button className="btn btn-primary w-100 py-2 " type="submit">
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
