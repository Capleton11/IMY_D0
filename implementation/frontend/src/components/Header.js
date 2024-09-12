import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
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
        <div style={{marginRight:"20%"}}>
          <img src="/assets/images/notification-13-svgrepo-com.svg" alt="Notifications" style={{ height: '25px', marginRight: '20px' }} />
          <Link to="/logout">
            <img src="/assets/images/logout-svgrepo-com.svg" alt="Logout" style={{ height: '25px' }} />
            <span>Logout</span>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;