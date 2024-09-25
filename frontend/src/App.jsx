import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProductForm from "./components/AddProductForm";

import { useDispatch } from "react-redux";
import { setUserInfo } from "./features/usersSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      // If user info exists in localStorage, restore it to Redux
      dispatch(setUserInfo(JSON.parse(userInfo)));
    }
  }, [dispatch]);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
          <Route path="/addproduct" element={<AddProductForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
