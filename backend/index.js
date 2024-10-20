// const connectToMongo = require('./db');
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// connectToMongo();

// const app = express()
// const port = process.env.PORT || 5001;

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
const path = require('path');

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5001;


app.use(cors());
app.use(express.json()); // to use req.body

// app.get('/', (req, res) => {
//     res.json({ status: true, message: "iNotebook backend running successfully" });
// });

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', (_,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend","build","index.html"));

})

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port} at http://localhost:${port}`);
});
