import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import styles from '../styles/NoteItem.module.css';
import { summarizeNote } from '../context/notes/NoteState'; // ✅ correct path

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  // Summarization states
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [show, setShow] = useState(false);

  const onSummarize = async () => {
    try {
      setLoading(true);
      const { summary } = await summarizeNote({ noteId: note._id, save: false });
      setSummary(summary);
      setShow(true);
    } catch (e) {
      alert(e.message || "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='col-md-3'>
      <div className={`card my-3 ${styles.card}`}>
        <div className={`card-body ${styles['card-body']}`}>
          <div className={`d-flex align-items-center ${styles.icons}`}>
            <h5 className={`card-title ${styles['card-title']}`}>
              <strong>Title:</strong> {note.title}
            </h5>
            <i
              className={`fa-solid fa-pen-to-square mx-2 ${styles.icon}`}
              onClick={() => updateNote(note)}
            ></i>
            <i
              className={`fa-solid fa-trash mx-2 ${styles.icon}`}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted successfully", "Success");
              }}
            ></i>
          </div>

          <p className={`card-text ${styles['card-text']}`}>
            <strong>Description:</strong> {note.description}
          </p>
          <p className={`card-text ${styles['card-text']}`}>
            <strong>Tag:</strong> {note.tag}
          </p>

          <button
            className="btn btn-outline-primary mt-2"
            disabled={loading}
            onClick={onSummarize}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </div>
      </div>

      {show && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Note Summary</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>

              <div className="modal-body">
                <pre style={{ whiteSpace: "pre-wrap" }}>{summary}</pre>
              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-primary"
                  onClick={() => setShow(false)}
                >
                  OK
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
