const express = require('express');
const {
  getAllSongs,
  createSong,
  getSongById,
  deleteSong,
} = require('../controllers/songController');

const router = express.Router();

router.get('/', getAllSongs); // View song feed
router.post('/', createSong); // Create a new song
router.get('/:id', getSongById); // View song by ID
router.delete('/:id', deleteSong); // Delete a song by ID

module.exports = router;