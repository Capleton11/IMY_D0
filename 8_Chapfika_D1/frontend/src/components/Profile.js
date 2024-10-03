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
        <button
  onClick={this.props.handleDeleteProfile}
  style={{
    backgroundColor: '#ff4d4d', // Light red color
    color: '#fff', // White text
    border: '1px solid #ff1a1a', // Slightly darker red border
    borderRadius: '4px', // Slightly rounded corners
    padding: '8px 12px', // Padding for better size
    fontSize: '14px', // Slightly larger font size
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.2s, transform 0.2s', // Smooth transition for background color and scale
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#ff1a1a'; // Darker red on hover
    e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = '#ff4d4d'; // Revert to original color
    e.currentTarget.style.transform = 'scale(1)'; // Revert scale
  }}
>
  Delete Profile
</button>
      </div>
    );
  }
}

export default Profile;