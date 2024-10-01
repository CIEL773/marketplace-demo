import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../features/usersSlice";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const { register, handleSubmit, getValues} = useForm();

  // Redirect to profile page if userInfo is not available
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin'); 
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    console.log(data)
    if (userInfo) {
      dispatch(updateUserPassword({ password: data.password }));
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit(submitForm)} className="mt-4">
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password*</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter new password"
            {...register('password', { required: true, minLength: 6 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password*</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm new password"
            {...register('confirmPassword', { required: true, validate: (value) => value === getValues('password') })}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Submit"}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
