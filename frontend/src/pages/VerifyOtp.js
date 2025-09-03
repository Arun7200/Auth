import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.parse(sessionStorage.getItem("pendingSignup"));
    if (!data) {
      toast.error("Signup session expired");
      navigate('/signup');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/otp/verify-otp`, {
        email: data.email,
        otp,
      });

      toast.success("Signup complete! You can now login.");
      sessionStorage.removeItem("pendingSignup");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Verify OTP</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Enter the 6-digit OTP sent to your email</label>
                  <input
                    type="text"
                    maxLength="6"
                    className="form-control text-center"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">Verify</button>
              </form>
              <p className="text-center mt-3 mb-0">
                <a href="/signup">Back to Signup</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}