import React from 'react';

class ProfilePreview extends React.Component {
  render() {
    const { user } = this.props;

    const profilePreviewStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      width: '150px',
    };

    const avatarStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginBottom: '10px',
    };

    const nameStyle = {
      margin: 0,
      fontSize: '16px',
      color: '#333',
    };

    const followersStyle = {
      margin: '5px 0',
      fontSize: '12px',
      color: '#666',
    };

    const followingStyle = {
      margin: 0,
      fontSize: '12px',
      color: '#666',
    };

    return (
      <div style={profilePreviewStyle}>
        <img
          src={user.profilePicture}
          alt={`${user.name}'s avatar`}
          style={avatarStyle}
        />
        <h4 style={nameStyle}>{user.name}</h4>
        <p style={followersStyle}>Followers: {user.followers}</p>
        <p style={followingStyle}>Following: {user.following}</p>
      </div>
    );
  }
}

export default ProfilePreview;
