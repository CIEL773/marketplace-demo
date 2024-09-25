import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateUserProfile } from "../features/userSlice"; // Assumed action
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  // Pre-fill the form with existing user info when the component loads
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        address: userInfo.address || "",
      });
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData)); // Dispatch action to update the profile
    navigate("/profile"); // Navigate back to the profile page after updating
  };

  return (
    <div className="container mt-5">
      <h1>Update Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfilePage;
