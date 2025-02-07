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
// const connectToMongo = require('./db');
// const express = require('express');
// const cors = require('cors');

// connectToMongo();

// const app = express()
// const port = 5000

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
//------------------------------------
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

// CORS configuration for Render deployment
const corsOptions = {
    origin: "https://e-notebook-fu9z.onrender.com/",
    credentials: true
};

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS with custom options
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the frontend build folder (one level up from the backend folder)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// For any route not matching an API endpoint, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port} at http://localhost:${port}`);
});

