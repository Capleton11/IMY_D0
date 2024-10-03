import React from 'react';
import { Link } from 'react-router-dom';
import withNavigate from '../hocs/withNavigate'; // Adjust the path as needed

class Header extends React.Component {
  handleLogout = () => {
    // Optionally clear any user session data or tokens here
    // For example: localStorage.removeItem('userToken');

    // Show logout message
    

    // Navigate to the Splash page
    this.props.navigate('/');
    
  };

  render() {
    return (
      <header style={{
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
      }}>
        <img src="/assets/images/logo.png" alt="Logo" style={{ height: '50px' }} />
        <div style={{ marginRight: "20%" }}>
          <img src="/assets/images/notification-13-svgrepo-com.svg" alt="Notifications" style={{ height: '25px', marginRight: '20px' }} />
          <button onClick={this.handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src="/assets/images/logout-svgrepo-com.svg" alt="Logout" style={{ height: '25px', marginRight: '5px' }} />
            <span>Logout</span>
          </button>
        </div>
      </header>
    );
  }
}

// Wrap the Header component with the withNavigate HOC
export default withNavigate(Header);