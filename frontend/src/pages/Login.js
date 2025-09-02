import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success('Login successful!');
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed!");
    }
  };

  // Google login handler
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/google/login'; // Backend should handle Google OAuth
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Login to Your Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <button
                className="btn btn-outline-danger w-100 mt-3"
                onClick={handleGoogleLogin}
                type="button"
              >
                Login with Google
              </button>
              <p className="text-center mt-3 mb-0">
                Don't have an account? <a href="/signup">Sign up here</a>
              </p>
              <p className="text-center mt-3">
                <a href="/forgot-password">Forgot password?</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}