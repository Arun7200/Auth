import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/password/forgot-password`, { email });
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Forgot Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Enter your registered email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Reset Link
                </button>
              </form>
              <p className="text-center mt-3 mb-0">
                <a href="/login">Back to Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}