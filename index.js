// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./database');
// const routes = require('./routes');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());
// app.use(cors());


// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// // Routes
// app.use('/api', routes);

// // Listen to the server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log('Connected to the SQLite database.');
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/database');
const routes = require('./src/routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use the environment variable PORT

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', routes);

// Catch-all handler for serving the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log(__dirname);
// Listen to the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Connected to the SQLite database.');
});
