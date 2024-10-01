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

  // All US states
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

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
              Address/State
            </label>
            {/* <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            /> */}
            <select
              id="address"
              name="address"
              className="form-select"
              value={formData.address}
              onChange={handleInputChange}
            >
              <option value="">--Select a state--</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
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
