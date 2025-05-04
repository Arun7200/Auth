import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Router>
        <ToastContainer position="top-right" />
        <nav className="bg-dark text-white p-3 px-5 d-flex justify-content-between align-items-center">
          <h1 className="h4 m-0">Authly</h1>
          <div>
            {!token && (
              <>
                <Link
                  to="/login"
                  className="text-white me-3 text-decoration-none"
                >
                  Login
                </Link>
                <Link to="/signup" className="text-white text-decoration-none">
                  Signup
                </Link>
              </>
            )}
            {token && (
              <Link to="/dashboard" className="text-white text-decoration-none">
                Dashboard
              </Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
