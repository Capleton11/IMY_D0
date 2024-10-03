import React from 'react';

class ProfilePreview extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        width: '150px',
      }}>
        <img
          src={user.profilePicture}
          alt={`${user.name}'s avatar`}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginBottom: '10px',
          }}
        />
        <h4 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{user.name}</h4>
        <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>Followers: {user.followers}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Following: {user.following}</p>
      </div>
    );
  }
}

export default ProfilePreview;