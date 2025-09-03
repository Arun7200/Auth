import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Simple validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errs.email = 'Invalid email';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/otp/send-otp`, formData);
      toast.success('OTP sent to your email');
      sessionStorage.setItem("pendingSignup", JSON.stringify(formData));
      navigate('/verify-otp');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        api: err.response?.data?.msg || 'Signup failed. Please try again.'
      }));
      toast.error(err.response?.data?.msg || 'Signup failed');
    }
    setLoading(false);
  };

  // Google signup handler
  const handleGoogleSignup = async () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/api/google/signup`; // Backend should handle Google OAuth
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Create Account</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
                {errors.api && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errors.api}
                  </div>
                )}
              </form>
              <button
                className="btn btn-outline-danger w-100 mt-3"
                onClick={handleGoogleSignup}
                type="button"
              >
                Sign up with Google
              </button>
              <p className="text-center mt-3 mb-0">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}