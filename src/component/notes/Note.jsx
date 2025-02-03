import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
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

      const response = await axios.get("/note", {
        headers: { token },
      });

      if (response.data.length > 0) {
        setNote(response.data[0].note_desc || "");
        setNoteId(response.data[0].note_id);
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

      const url = "/note";
      const method = noteId ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        headers: { token },
        data: { noteId, noteDesc: note },
      });

      if (!noteId) {
        setNoteId(response.data.note_id);
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
