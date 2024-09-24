import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Importing the root component
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
