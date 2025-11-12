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
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const cors = require('cors');
const path = require("path");
const corsOptions = {
  origin: process.env.CLIENT_URL || "https://e-notebook-fu9z.onrender.com/",
  credentials: true
};

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// CORS configuration for Render deployment (or adjust for your needs)

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const aiRoutes = require('./routes/ai');
app.use("/api/ai", aiRoutes);

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port} at http://localhost:${port}`);
});
