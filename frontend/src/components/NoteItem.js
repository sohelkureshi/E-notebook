import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import styles from '../styles/NoteItem.module.css';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className='col-md-3'>
      <div className={`card my-3 ${styles.card}`}>
        <div className={`card-body ${styles['card-body']}`}>
          <div className={`d-flex align-items-center ${styles.icons}`}>
            <h5 className={`card-title ${styles['card-title']}`}>{note.title}</h5>
            <i className={`fa-solid fa-pen-to-square mx-2 ${styles.icon}`} onClick={() => { updateNote(note) }}></i>
            <i className={`fa-solid fa-trash mx-2 ${styles.icon}`} onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully", "Success") }}></i>
          </div>
          <p className={`card-text ${styles['card-text']}`}>{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem;
