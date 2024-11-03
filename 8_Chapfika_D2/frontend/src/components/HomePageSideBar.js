import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    const { user } = this.props;

    // Safeguard: If user is undefined, use default values
    const profilePicture = user?.profilePicture || '/assets/images/jj.png';
    const username = user?.name || '';

    const sidebarStyle = {
      width: '10%',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      position: 'fixed',
      top: '60px', // Adjust based on the header height
      bottom: 0,
      overflowY: 'auto',
    };

    const userProfileStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    };

    const profileImageStyle = {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
    };

    const usernameStyle = {
      marginLeft: '10px',
    };

    const navListStyle = {
      listStyle: 'none',
      padding: 0,
    };

    const navItemStyle = {
      marginBottom: '15px',
    };

    const linkStyle = {
      textDecoration: 'none',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
    };

    const iconStyle = {
      width: '20px',
      marginRight: '10px',
    };

    return (
      <aside style={sidebarStyle}>
        <div style={userProfileStyle}>
          <img src={profilePicture} alt="Profile" style={profileImageStyle} />
          <div style={usernameStyle}>
            <h3>{username}</h3>
          </div>
        </div>
        <nav>
          <ul style={navListStyle}>
            <li style={navItemStyle}>
              <Link to="/home" style={linkStyle}>
                <img src="/assets/images/home-1-svgrepo-com.svg" alt="Home" style={iconStyle} />
                Home
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/playlist" style={linkStyle}>
                <img src="/assets/images/playlist-svgrepo-com.svg" alt="Playlists" style={iconStyle} />
                Playlists
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/profile" style={linkStyle}>
                <img src="/assets/images/profile-circle-svgrepo-com.svg" alt="Profile" style={iconStyle} />
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
