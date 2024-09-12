import React from 'react';
import { Link } from 'react-router-dom';

class ProfileSidebar extends React.Component {
  render() {
    const { user } = this.props; // Assuming user is passed as a prop

    return (
      <aside style={{
        width: '250px', 
        backgroundColor: '#f4f4f4', 
        padding: '20px', 
        minHeight: '100vh',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Profile Section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img src={user.profilePicture} alt={user.name} style={{
            width: '60px', 
            height: '60px', 
            borderRadius: '50%',
            border: '2px solid #1db954',
          }} />
          <div style={{ marginLeft: '10px' }}>
            <h3>{user.name}</h3> {/* Dynamically rendered username */}
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/home" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/logo.png" alt="Home" style={{ width: '20px', marginRight: '10px' }} />
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/friends" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/logo.png" alt="Friends" style={{ width: '20px', marginRight: '10px' }} />
                Friends
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/library" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/logo.png" alt="Library" style={{ width: '20px', marginRight: '10px' }} />
                Your Library
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/playlist" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/logo.png" alt="Playlists" style={{ width: '20px', marginRight: '10px' }} />
                Playlists
              </Link>
            </li>
            <li>
              <Link to="/settings" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/logo.png" alt="Settings" style={{ width: '20px', marginRight: '10px' }} />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default ProfileSidebar;