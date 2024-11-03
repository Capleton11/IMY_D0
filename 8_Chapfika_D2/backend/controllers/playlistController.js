const Playlist = require('../models/playlist');

// View playlist feed
exports.getAllPlaylists = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { 
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ] 
      };
    }

    const playlists = await Playlist.find(query).populate('owner songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { name, description, owner, songs, imageUrl } = req.body;
    const newPlaylist = new Playlist({ name, description, owner, songs, imageUrl });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View and edit your playlist
exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs owner');
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    const { name, description, songs, imageUrl } = req.body;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { name, description, songs, imageUrl },
      { new: true }
    ).populate('songs owner');
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a playlist
exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();

      res.json({ songId }); // Return only the song ID
    } else {
      res.status(400).json({ message: 'Song already in playlist' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a song from the playlist
exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};