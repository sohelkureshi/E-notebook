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

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.json({ status: true, message: "iNotebook backend running successfully" });
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const aiRoutes = require('./routes/ai');
app.use("/api/ai", aiRoutes);

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port} at http://localhost:${port}`);
});
