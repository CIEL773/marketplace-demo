import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "../features/usersSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cart from "./Cart";
import { searchProducts } from "../features/productsSlice";
import debounce from 'lodash/debounce';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading: signoutLoading, error: signoutError } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState('');

  // 使用 useMemo 确保防抖函数不会在每次渲染时都重新创建
  const debouncedSearch = useMemo(() =>
    debounce((query) => {
      if (query.trim() !== "") {
        dispatch(searchProducts({ query })); // 调用 Redux 中的 searchProducts
        navigate(`/search?query=${query}`); // 导航到搜索页面
      }
    }, 500), [dispatch, navigate]); // 500ms 防抖延迟

  // 当搜索框的值改变时调用 debouncedSearch
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };


  const handleSignout = async () => {
    try {
      dispatch(signoutUser());
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none text-body-secondary"
          >
            <h3>Management</h3>
          </a>
        </div>

        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-primary" type="submit" onClick={() => debouncedSearch(searchQuery)}>Search</button>
        </form>

        <div className="col-md-3 text-end">
          {userInfo ? (
            <>
              <Link to="/profile" className="me-2">
                <img
                  src={userInfo.avatar || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
              <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={handleSignout}
              >
                Sign-out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button type="button" className="btn btn-outline-primary me-2">
                  Sign-in
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-outline-primary me-2">
                  Sign-up
                </button>
              </Link>
            </>
          )}
          <Cart />
        </div>
      </header>
    </div>
  );
};

export default Header;
