const express = require('express');
const {
  getAllPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require('../controllers/playlistController');

const router = express.Router();

router.get('/', getAllPlaylists); // View playlist feed
router.post('/', createPlaylist); // Create a new playlist
router.get('/:id', getPlaylistById); // View playlist by ID
router.put('/:id', updatePlaylist); // Edit playlist by ID
router.delete('/:id', deletePlaylist); // Delete playlist by ID
router.post('/:id/song', addSongToPlaylist); // Add a song to the playlist
router.delete('/:id/song', removeSongFromPlaylist); // Remove a song from the playlist

module.exports = router;