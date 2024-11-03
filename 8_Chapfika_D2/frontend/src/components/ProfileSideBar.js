import React from 'react';
import { Link } from 'react-router-dom';

class ProfileSidebar extends React.Component {
  render() {
    const { user } = this.props;

    const sidebarStyle = {
      width: '250px',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      minHeight: '100vh',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    };

    const profileSectionStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    };

    const profileImageStyle = {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: '2px solid #1db954',
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
        {/* Profile Section */}
        <div style={profileSectionStyle}>
          <img src={user.profilePicture} alt={user.name} style={profileImageStyle} />
          <div style={{ marginLeft: '10px' }}>
            <h3>{user.name}</h3> {/* Dynamically rendered username */}
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul style={navListStyle}>
            <li style={navItemStyle}>
              <Link to="/home" style={linkStyle}>
                <img src="/assets/images/home-1-svgrepo-com.svg" alt="Home" style={iconStyle} />
                Home
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/friends" style={linkStyle}>
                <img src="/assets/images/circled-group-svgrepo-com.svg" alt="Friends" style={iconStyle} />
                Friends
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/users" style={linkStyle}>
                <img src="/assets/images/users.svg" alt="Users" style={iconStyle} />
                Users
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/library" style={linkStyle}>
                <img src="/assets/images/library-svgrepo-com.svg" alt="Library" style={iconStyle} />
                Your Library
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/playlist" style={linkStyle}>
                <img src="/assets/images/playlist-svgrepo-com.svg" alt="Playlists" style={iconStyle} />
                Playlists
              </Link>
            </li>
            <li>
              <Link to="/settings" style={linkStyle}>
                <img src="/assets/images/settings-svgrepo-com.svg" alt="Settings" style={iconStyle} />
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
