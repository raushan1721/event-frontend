import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import getPrivateRoutes from "./utils/getPrivateRoutes";
import authRoutes from "./routes/auth";
import home from "./routes/home";
import getAuthRoutes from "./utils/getAuthRoutes";
import { requestWithToken } from "./utils/httpRequest";
import Votes from "./Pages/Voting/Votes";
import AuthLayout from "./Layout/AuthLayout.js/AuthLayout";
import Login from "./Pages/Auth/Login/Login";

const token = window.localStorage.getItem("isLoggedIn");

function App() {
  useEffect(() => {
    const isLoggedIn = async () => {
      const result = await requestWithToken("GET", "/auth/isloggedin");
      if (!result.data) {
        window.localStorage.removeItem("isLoggedIn");
      } else {
        window.localStorage.setItem("isLoggedIn", true);
      }
    };
    isLoggedIn();
  }, []);

  return (
    <Router>
      <Routes>
        {getAuthRoutes(authRoutes)}
        {getPrivateRoutes(home)}
        <Route
          exact={true}
          path="/"
          element={
            !token ? <AuthLayout component={Login} /> : <Navigate to="/home" />
          }
        />
        <Route exact={true} path="/event/vote/:id" element={<Votes />} />
      </Routes>
    </Router>
  );
}

export default App;
