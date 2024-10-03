const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const userRoutes = require('../routes/userRoutes');
const playlistRoutes = require('../routes/playlistRoutes');
const songRoutes = require('../routes/songRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://u22554875:Capleton%40112004@imy220.l9iop.mongodb.net/JiveTroveDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON
app.use(express.json());

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);

// Serve static files from the frontend/public folder only for non-API routes
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

// Handle non-API routes by serving the frontend's index.html
app.get('*', (req, res) => {
  // Check if the request is not for an API route
  if (!req.url.startsWith('/api/')) {
    res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
  } else {
    res.status(404).json({ message: 'API route not found' });
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});