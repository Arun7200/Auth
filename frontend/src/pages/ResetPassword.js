import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/password/reset-password/${token}`, { password });
      toast.success("Password has been reset! Please login.");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.response?.data?.msg || "Reset failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Reset Your Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Reset Password
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
