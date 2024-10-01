import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../features/usersSlice";
import { useNavigate, Link } from "react-router-dom";


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

          <div className="form-floating mb-3">
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

          <div className="form-floating mb-3">
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



          
          <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
            <div className="d-flex justify-content-center align-items-center mt-3">
            <Link to='/resetpassword' className="btn btn-link">Forget Password?</Link>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </main>
    </div>
  );
};

export default SigninPage;
