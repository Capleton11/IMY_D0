import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';
import PlaylistWrapper from './hocs/PlaylistWrapper';
import UsersList from './components/UsersList';
import FriendsList from './components/FriendsList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/playlist/:id" element={<PlaylistWrapper />} />
        <Route path="/users" element={<UsersList />} /> 
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsList />} />
      </Routes>
    </Router>
  );
}

export default App;