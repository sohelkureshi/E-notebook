import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const host = "https://e-notebook-fu9z.onrender.com"

  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Get all notes
  const getNotes = async () => {
    const url = `https://e-notebook-fu9z.onrender.com/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `https://e-notebook-fu9z.onrender.com/api/notes/addnote`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const url = `https://e-notebook-fu9z.onrender.com/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `https://e-notebook-fu9z.onrender.com/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// Gemini AI Summarization API Call
export async function summarizeNote({ noteId, save = false }) {
  // const host = "https://e-notebook-fu9z.onrender.com"; 
  const res = await fetch(`https://e-notebook-fu9z.onrender.com/api/ai/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": sessionStorage.getItem("token")
    },
    body: JSON.stringify({ noteId, save })
  });

  if (!res.ok) throw new Error((await res.json()).error || "Summarize failed");
  return res.json(); // { summary, savedTo?, mode? }
}
