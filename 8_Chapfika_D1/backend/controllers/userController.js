const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign Up a new user
exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log In a user
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, "mySecretKey123", { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log Out (Placeholder function, handled by frontend)
exports.logOut = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};

// View and edit your profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, bio, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, bio, profilePicture },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Friend / Unfriend other users
exports.addFriend = async (req, res) => {
  try {
    const { friendId } = req.body; // Get friendId from the request body
    const userId = req.params.id; // Get current user's ID from URL params

    // Check if the user exists
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    if (!friend) {
      return res.status(404).json({ message: 'Friend user not found' });
    }

    // Check if already friends
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
      res.json(user); // Respond with updated user
    } else {
      res.status(400).json({ message: 'Already friends' });
    }
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.params.id);
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete your profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { 
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ] 
      };
    }

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('playlists friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserFriends = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const user = await User.findById(userId).populate('friends'); // Populate the friends array

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.friends); // Return the friends array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};