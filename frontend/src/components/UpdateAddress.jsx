import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserAddress } from "../features/usersSlice";

const UpdateAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const { register, handleSubmit, setValue } = useForm();

  // Populate form with existing address if available
  useEffect(() => {
    if (userInfo && userInfo.address) {
      setValue("street", userInfo.address.street || "");
      setValue("city", userInfo.address.city || "");
      setValue("state", userInfo.address.state || "");
    }
  }, [userInfo, setValue]);

  // Redirect to profile page if userInfo is not available
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin'); // Redirect to signin page if not logged in
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    if (userInfo) {
      dispatch(updateUserAddress({ userId: userInfo._id, address: data }));
      navigate("/profile");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Update Address</h1>
      <form onSubmit={handleSubmit(submitForm)} className="mt-4">
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street*</label>
          <input
            type="text"
            id="street"
            className="form-control"
            placeholder="Enter street"
            {...register('street', { required: true })}
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">City*</label>
            <input
              type="text"
              id="city"
              className="form-control"
              placeholder="Enter city"
              {...register('city', { required: true })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="state" className="form-label">State*</label>
            <select
              id="state"
              className="form-select"
              {...register('state', { required: true })}
            >
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Submit"}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateAddress;
