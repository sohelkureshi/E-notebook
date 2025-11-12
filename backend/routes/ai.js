// backend/routes/ai.js
const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { summarizeText } = require("../services/gemini");
const { body, validationResult } = require("express-validator");

const router = express.Router();

/**
 * POST /api/ai/summarize
 * Body: { noteId?: string, text?: string, save?: boolean }
 */
router.post(
  "/summarize",
  fetchuser,
  [
    body("noteId").optional().isString(),
    body("text").optional().isString(),
    body("save").optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { noteId, text, save } = req.body;
      if (!noteId && !text)
        return res.status(400).json({ error: "Provide noteId or text" });

      let sourceText = text;
      let note;

      if (noteId) {
        note = await Note.findOne({ _id: noteId, user: req.user.id });
        if (!note) return res.status(404).json({ error: "Note not found" });
        sourceText = `${note.title ? note.title + " — " : ""}${note.description || ""}`;
      }

      const summary = await summarizeText(sourceText);

      if (save) {
        // Save summary in the note itself (if model updated)
        if (note) {
          note.summary = summary;
          await note.save();
          return res.json({
            summary,
            savedTo: note._id,
            mode: "updated-summary-field",
          });
        }

        // Or create a new summarized note
        const newNote = await Note.create({
          user: req.user.id,
          title: "Summary",
          description: summary,
          tag: "summary",
        });
        return res.json({
          summary,
          savedTo: newNote._id,
          mode: "created-new-note",
        });
      }

      res.json({ summary });
    } catch (err) {
      console.error("Summarize error:", err);
      if (err?.status === 429) {
        return res
          .status(429)
          .json({ error: "Rate limited by Gemini API. Try again later." });
      }
      res.status(500).json({ error: "Failed to summarize" });
    }
  }
);

module.exports = router;
