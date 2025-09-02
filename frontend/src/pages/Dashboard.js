import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [noteInput, setNoteInput] = useState("");

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

  const handleAddNote = () => {
    if (noteInput.trim() === "") return;
    const newNotes = [...notes, noteInput];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNoteInput("");
  };

  const handleDeleteNote = (idx) => {
    const newNotes = notes.filter((_, i) => i !== idx);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-2">
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
      <div className="card shadow-sm p-4 text-center">
        <h2 className="mb-4">Welcome to Your Dashboard 🎉</h2>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <hr />
            <h4 className="mt-4">📝 Notes</h4>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Write a note..."
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
              />
              <button
                onClick={handleAddNote}
                className="btn btn-primary mt-2"
              >
                Add Note
              </button>
            </div>
            <ul className="list-group">
              {notes.length === 0 && <li className="list-group-item">No notes yet.</li>}
              {notes.map((note, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  {note}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteNote(idx)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}