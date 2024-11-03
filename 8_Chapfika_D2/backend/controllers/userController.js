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
    const { username, bio, profilePicture } = req.body; // Include profilePicture in request body

    const updateData = { username, bio };
    if (profilePicture) {
      updateData.profilePicture = profilePicture; // Only update if profilePicture is provided
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};// userController.js

exports.addFriend = async (req, res) => {
  try {
    const { userId } = req.params; // ID of the current user
    const { friendId } = req.body;  // ID of the friend to add

    // Find the user and update their friends list
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Add friendId only if it's not already in the list
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error('Error in addFriend:', error);
    res.status(500).json({ message: 'Server error in addFriend', error: error.message });
  }
};




exports.removeFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();

    const updatedFriends = await User.findById(userId).populate('friends');
    res.json({ message: 'Friend removed successfully', friends: updatedFriends.friends });
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

exports.searchUsers = async (req, res) => {
  const { name } = req.query; // Get the search term from query parameters

  try {
    // Find users whose names match the search term (case insensitive)
    const users = await User.find({
      username: { $regex: new RegExp(name, 'i') } // Regular expression for case-insensitive search
    });

    res.json(users); // Send the matched users as the response
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const randomProfileImages = [
  'https://cdn.pixabay.com/photo/2024/10/21/02/31/cute-furry-pot-bellied-garfield-cat-9136057_1280.png',
  'https://cdn.pixabay.com/photo/2020/04/30/04/05/james-garfield-5111309_1280.png',
  'https://cdn.pixabay.com/photo/2017/11/06/18/30/eggplant-2924511_1280.png',
  'https://cdn.pixabay.com/photo/2024/01/27/18/17/panda-8536525_1280.png',
  'https://cdn.pixabay.com/photo/2024/01/26/15/53/monster-8534186_1280.png'
];

const getRandomProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * randomProfileImages.length);
  return randomProfileImages[randomIndex];
};


exports.updateRandomProfilePicture = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const randomImage = getRandomProfileImage();

    // Find the user and update the profile picture URL
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: randomImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile picture updated successfully', user });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};