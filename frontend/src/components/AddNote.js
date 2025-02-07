import React, { useContext, useState } from 'react';
import { FiBook, FiEdit, FiTag, FiSave } from 'react-icons/fi';
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
        <div className={styles.containerWrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <FiEdit className={styles.headerIcon} />
                    <h2 className={styles.h2}>Create New Note</h2>
                    <div className={styles.decorativeLine}></div>
                </div>
                
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.formLabel}>
                            <FiBook className={styles.inputIcon} />
                            Title
                        </label>
                        <input 
                            type="text" 
                            className={styles.formControl} 
                            id="title" 
                            name='title' 
                            value={note.title} 
                            minLength={3} 
                            required 
                            onChange={onChange} 
                            placeholder="Enter note title"
                        />
                        <span className={styles.focusBorder}></span>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.formLabel}>
                            <FiEdit className={styles.inputIcon} />
                            Description
                        </label>
                        <input 
                            type="text" 
                            className={styles.formControl} 
                            id="description" 
                            name='description' 
                            value={note.description} 
                            minLength={5} 
                            required 
                            onChange={onChange} 
                            placeholder="Write your note content"
                        />
                        <span className={styles.focusBorder}></span>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tag" className={styles.formLabel}>
                            <FiTag className={styles.inputIcon} />
                            Tag
                        </label>
                        <input 
                            type="text" 
                            className={styles.formControl} 
                            id="tag" 
                            name='tag' 
                            value={note.tag} 
                            onChange={onChange} 
                            placeholder="Add relevant tags"
                        />
                        <span className={styles.focusBorder}></span>
                    </div>

                    <button 
                        type="submit" 
                        disabled={note.title.length < 3 || note.description.length < 5} 
                        className={styles.btnPrimary} 
                        onClick={handleAddNote}
                    >
                        <FiSave className={styles.btnIcon} />
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
