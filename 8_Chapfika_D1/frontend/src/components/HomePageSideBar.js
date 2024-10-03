import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    const { user } = this.props;

    // Safeguard: If user is undefined, use default values
    const profilePicture = user?.profilePicture || '/assets/images/jj.png';
    const username = user?.name || '';

    return (
      <aside style={{
        width: '10%',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        position: 'fixed',
        top: '60px', // Adjust based on the header height
        bottom: 0,
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img 
            src={profilePicture} 
            alt="Profile" 
            style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
          />
          <div style={{ marginLeft: '10px' }}>
            <h3>{username}</h3>
          </div>
        </div>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/home" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/home-1-svgrepo-com.svg" alt="Home" style={{ width: '20px', marginRight: '10px' }} /> 
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/playlist" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/playlist-svgrepo-com.svg" alt="Playlists" style={{ width: '20px', marginRight: '10px' }} /> 
                Playlists
              </Link>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Link to="/profile" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/images/profile-circle-svgrepo-com.svg" alt="Profile" style={{ width: '20px', marginRight: '10px' }} /> 
                Profile
              </Link>
            </li>

          </ul>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;