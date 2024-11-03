const express = require('express');
const { signUp,
    logIn,
    logOut,
    getProfile,
    updateProfile,
    deleteProfile,
    addFriend,
    removeFriend,
     getUsers ,
    getUserById,
    getUserFriends,
    searchUsers,
    updateRandomProfilePicture,} = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUp); // Sign up a new user
router.post('/login', logIn); // Log in a user
router.post('/logout', logOut); // Log out a user
router.delete('/:id', deleteProfile); // Delete user profile
router.get('/:id/profile', getProfile); // View user profile by ID
router.put('/:id/profile', updateProfile); // Edit user profile by ID
router.post('/:userId/friend', addFriend); // Add a friend
router.delete('/:id/friend', removeFriend); // Remove a friend
router.get('/', getUsers);    // Get all users
router.get('/:id/profile', getUserById);
router.get('/:id/friends', getUserFriends);
router.get('/search', searchUsers);
router.put('/:userId/profile-picture/random', updateRandomProfilePicture);

module.exports = router;