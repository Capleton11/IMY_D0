const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);