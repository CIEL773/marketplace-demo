import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";


const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const { register, handleSubmit } = useForm()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(signinUser(data))
  }


  return (
    <div>
      <main className="form-signin col-lg-3 m-auto">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              placeholder="name@example.com"
              {...register('email')}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              {...register('password')}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* todo */}
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

          <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </main>
    </div>
  );
};

export default SigninPage;
