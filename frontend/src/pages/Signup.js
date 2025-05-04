import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/otp/send-otp', formData);
      toast.success('OTP sent to your email');
      // Save data to sessionStorage and navigate to verify page
      sessionStorage.setItem("pendingSignup", JSON.stringify(formData));
      navigate('/verify-otp');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Create Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Send OTP</button>
              </form>
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
