const express = require('express');
const {
  getAllSongs,
  createSong,
  getSongById,
  deleteSong,
  updateSong,
} = require('../controllers/songController');

const router = express.Router();
router.put('/:id',updateSong);
router.get('/', getAllSongs); // View song feed
router.post('/', createSong); // Create a new song
router.get('/songs/search', async (req, res) => {
  try {
    const { title } = req.query;
    const song = await song.findOne({ title: { $regex: new RegExp(title, 'i') } });
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for the song' });
  }
});
router.get('/:id', getSongById); // View song by ID
router.delete('/:id', deleteSong); // Delete a song by ID


module.exports = router;