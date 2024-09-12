import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const LoginPage = () => {
  return (
    <div>
      <main className="form-signin col-lg-3 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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

          {/* Remember-me field */}
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
