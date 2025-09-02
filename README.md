# Authentication – Secure Auth System (MERN)

> A full-stack authentication system with Email OTP verification, password reset, JWT protection, and clean UI using Bootstrap.

## Features

- User Signup + Login with JWT
- OTP Verification via Email during Signup
- Forgot Password with Email Reset Link
- Secure Password Hashing using bcrypt
- Nodemailer-based Email Service
- Temporary in-memory store for OTP

## How to Run the Project Locally

### 1.Clone the Repository 

```bash
git clone https://github.com/Arun7200/Auth.git
cd authly
```
### 2.Backend Setup
```bash
cd backend
npm install
```
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/authly
JWT_SECRET=supersecretkey
EMAIL_USER=enter_your_enail@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```
### Start the backend server:
```bash 
npm start
```
Server runs at: http://localhost:5000

### 3.Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Fontend runs at: http://localhost:3000

## 4.Installed Dependencies
- Create a .env File in the backendd
### Backend

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- nodemailer

### Frontend
- react
- react-dom
- react-router-dom
- axios
- react-toastify

- bootstrap
