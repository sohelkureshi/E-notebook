// const connectToMongo = require('./db');
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// connectToMongo();

// const app = express()
// const port = process.env.PORT || 5000;

// app.use(cors())
// app.use(express.json()) // to use req.body

// app.get('/', (req, res) => {
//   res.json({ status: true, message: "iNotebook backend running successfully" })
// })

// // available routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))

// app.listen(port, () => {
//   console.log(`iNotebook backend listening on port ${port} at http://localhost:${port}`)
// })
//--------------------------
// const connectToMongo = require('./db');
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// connectToMongo();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json()); // to use req.body

// app.get('/', (req, res) => {
//     res.json({ status: true, message: "iNotebook backend running successfully" });
// });

// // available routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

// app.listen(port, () => {
//     console.log(`iNotebook backend listening on port ${port} at http://localhost:${port}`);
// });
//---------------------------------------
// Load environment variables
// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToMongo = require("./db");

//  Connect MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

//  Configure CORS (Render + Local)
const corsOptions = {
  origin: process.env.CLIENT_URL || "https://e-notebook-fu9z.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

//  Register API routes FIRST (before serving React build)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/ai", require("./routes/ai"));

//  Serve React frontend (for Render)
app.use(express.static(path.join(__dirname, "../frontend/build")));

//  Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

//  Start server
app.listen(port, () => {
  console.log(`E-Notebook backend running on port ${port}`);
});
