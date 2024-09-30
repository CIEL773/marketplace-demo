import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {passwordReset} from "../features/usersSlice";

const UpdatePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error} = useSelector((state) => state.user);

  const {register, handleSubmit} = useForm();
  const [emailSent, setEmailSent] = useState(false);

  const submitForm = (data) => {
    dispatch(passwordReset(data));
    setEmailSent(true);
    setTimeout(() => {
      navigate("/resetsuccess");
    }, 2000);
  }

  return (
    <div>
      <main className="form-signin col-lg-3 m-auto">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1 className="h3 mb-3 fw-normal">Update Password</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              placeholder="name@example.com"
              {...register("email")}  
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <button
            className="btn btn-primary w-100 py-2 mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Update Password"}
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </main>
    </div>
  );
};

export default UpdatePasswordPage;