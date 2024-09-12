const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the correct frontend/public folder
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

// Catch all routes and send index.html so that React Router can take over
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});