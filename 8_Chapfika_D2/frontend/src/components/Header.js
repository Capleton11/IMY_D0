import React from 'react'; 
import { Link } from 'react-router-dom';
import withNavigate from '../hocs/withNavigate'; // Adjust the path as needed

class Header extends React.Component {
  handleLogout = () => {
    this.props.navigate('/');
  };

  render() {
    const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '9px 20px',
      backgroundColor: '#fff',
      width: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Optional shadow for better visibility
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
    };

    const logoStyle = {
      height: '50px',
    };

    const rightSectionStyle = {
      marginRight: '20%',
    };

    const notificationIconStyle = {
      height: '25px',
      marginRight: '20px',
    };

    const logoutButtonStyle = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
    };

    const logoutIconStyle = {
      height: '25px',
      marginRight: '5px',
    };

    return (
      <header style={headerStyle}>
        <img src="/assets/images/logo.png" alt="Logo" style={logoStyle} />
        <div style={rightSectionStyle}>
          <img src="/assets/images/notification-13-svgrepo-com.svg" alt="Notifications" style={notificationIconStyle} />
          <button onClick={this.handleLogout} style={logoutButtonStyle}>
            <img src="/assets/images/logout-svgrepo-com.svg" alt="Logout" style={logoutIconStyle} />
            <span>Logout</span>
          </button>
        </div>
      </header>
    );
  }
}

export default withNavigate(Header);
