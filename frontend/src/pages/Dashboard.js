import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 text-center">
        <h2 className="mb-4">Welcome to Your Dashboard 🎉</h2>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleLogout} className="btn btn-outline-danger mt-3">
              Logout
            </button>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}
