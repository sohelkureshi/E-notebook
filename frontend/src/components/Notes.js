import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Notes.module.css';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [user, setUser] = useState({ name: "loading...", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getNotes();
            getUser();
        }
        else {
            navigate('/login');
            props.showAlert("You are not logged in. Please login to see your notes", "Danger");
        }
        // eslint-disable-next-line
    }, [])

    const getUser = async () => {
        const response = await fetch( "https://e-notebook-fu9z.onrender.com" + '/api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            }
        });
        const json = await response.json();
        setUser({ name: json.name, email: json.email });
    }

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", newTitle: "", newDescription: "", newTag: "default" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, newTitle: currentNote.title, newDescription: currentNote.description, newTag: currentNote.tag })
    }

    const handleEditNote = (e) => {
        e.preventDefault();
        editNote(note.id, note.newTitle, note.newDescription, note.newTag)
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1 className={`container ${styles.welcome}`}>Welcome {user.name}!</h1>

            <AddNote showAlert={props.showAlert} />

            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className={`modal-header ${styles['modal-header']}`}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body ${styles['modal-body']}`}>
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="newTitle" className="form-label">New Title</label>
                                    <input type="text" className="form-control" id="newTitle" name='newTitle' value={note.newTitle} minLength={3} required aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newDescription" className="form-label">New Description</label>
                                    <input type="text" className="form-control" id="newDescription" name='newDescription' value={note.newDescription} minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newTag" className="form-label">New Tag</label>
                                    <input type="text" className="form-control" id="newTag" name='newTag' value={note.newTag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className={`modal-footer ${styles['modal-footer']}`}>
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.newTitle.length < 3 || note.newDescription.length < 5} className="btn btn-primary" onClick={handleEditNote}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`container row my-3 ${styles.row}`}>
            <h1 className={styles['notes-header']}>Your notes</h1>
            {notes.length === 0 ? (
                <div className={`container mx-1 ${styles['no-notes']}`}>
                    No notes to display
                </div>
            ) : (
                notes.map((note) => (
                    <NoteItem 
                        key={note._id} 
                        note={note} 
                        updateNote={updateNote} 
                        showAlert={props.showAlert} 
                    />
                ))
            )}
        </div>

        </>
    )
}

export default Notes;
