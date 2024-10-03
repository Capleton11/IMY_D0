const Song = require('../models/song');

// View song feed
exports.getAllSongs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { 
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { artist: { $regex: search, $options: 'i' } }
        ] 
      };
    }

    const songs = await Song.find(query).populate('addedBy');
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const { title, artist, imageUrl, spotifyLink, addedBy } = req.body;
    const newSong = new Song({ title, artist, imageUrl, spotifyLink, addedBy });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View a song by ID
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('addedBy');
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a song
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};