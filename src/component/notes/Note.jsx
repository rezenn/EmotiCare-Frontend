import React, { useState, useEffect } from "react";
import "./note.css";

function Note() {
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/note", {
        method: "GET",
        headers: { token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes.");
      }

      const data = await response.json();
      if (data.length > 0) {
        setNote(data[0].note_desc || "");
        setNoteId(data[0].note_id);
      }
    } catch (error) {
      console.error(error.message);
      setError("Failed to fetch notes.");
    }
  };

  const saveNote = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const token = localStorage.getItem("token");

      const url = "http://localhost:5000/note";
      const method = noteId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId: noteId,
          noteDesc: note,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save note.");
      }

      const result = await response.json();

      if (!noteId) {
        setNoteId(result.note_id);
      }
    } catch (error) {
      console.error(error.message);
      setError("Failed to save note.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!note || note.trim() === "") return;

    const debounceTimer = setTimeout(() => {
      saveNote();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [note]);

  return (
    <div className="noteContainer">
      <span className="noteTitle">Notes</span>
      <hr />
      <textarea
        name="notes"
        id="notes"
        className="note"
        value={note || ""}
        onChange={(e) => setNote(e.target.value)}
        disabled={isSaving}
        placeholder="note..."
      />
      {isSaving && <p className="savingIndicator">Saving...</p>}
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}

export default Note;
