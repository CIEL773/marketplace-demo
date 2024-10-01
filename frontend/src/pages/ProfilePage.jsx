import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // console.log("Profile page res: userInfo:", userInfo);
  // useEffect(() => {
  //   if (userInfo && !userInfo.address) {
  //     navigate("/profile/add-address");
  //   }
  // }, [userInfo, navigate]);

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        userInfo && (
          <>
            <div className="mb-3">
              <strong>Name:</strong> {userInfo.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userInfo.email}
            </div>
            <div className="mb-3">
              <strong>Address:</strong> {userInfo.address ? `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.state}` : "Not provided"}
            </div>
            <div className="mb-3">
              <strong>Role:</strong> {userInfo.role}
            </div>
            <button
              type="button"
              className="btn btn-primary d-block mb-3"
              onClick={() => navigate("/updatepassword")}
            >
              Update Password
            </button>
            <button
              type="button"
              className="btn btn-primary d-block mb-3"
              onClick={() => navigate("/updateaddress")}
            >
              Update Address
            </button>

            {userInfo.role === "vendor" && (
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={() => navigate("/addproduct")}
              >
                Add New Product
              </button>
            )}
          </>
        )
      )}
    </div>
  );
};

export default ProfilePage;
