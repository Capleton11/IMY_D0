import React from 'react';

class Profile extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <img
            src={user.profilePicture}
            alt={`${user.name}'s Profile`}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ccc',
            }}
          />
         
        </div>
        <div>
          <p>{user.bio}</p>
        </div>
      </div>
    );
  }
}

export default Profile;