import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import styles from '../styles/AddNote.module.css';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully", "Success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className={`container my-3 ${styles.container}`}>
            <h2 className={styles.h2}>Add a note</h2>
            <form className={`my-3 ${styles.form}`}>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="title" className={`form-label ${styles.formLabel}`}>Title</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="title" name='title' value={note.title} minLength={3} required aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="description" className={`form-label ${styles.formLabel}`}>Description</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="description" name='description' value={note.description} minLength={5} required onChange={onChange} />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="tag" className={`form-label ${styles.formLabel}`}>Tag</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className={`btn btn-primary ${styles.btnPrimary}`} onClick={handleAddNote}>Submit</button>
            </form>
        </div>
    );
}

export default AddNote;
