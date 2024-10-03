import React from 'react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name || '',
      bio: this.props.user.bio || ''
    };
  }

  componentDidUpdate(prevProps) {
    // Update state when the user prop changes (e.g., after updating the profile)
    if (prevProps.user !== this.props.user) {
      this.setState({
        name: this.props.user.name || '',
        bio: this.props.user.bio || ''
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, bio } = this.state;
    // Call the update handler passed as a prop
    this.props.handleProfileUpdate({ username: name, bio });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          backgroundColor: '#f4f4f4',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          margin: 'auto',
        }}
      >
        <h3 style={{ marginBottom: '20px', color: '#1DB954' }}>Edit Profile</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Bio:
          </label>
          <textarea
            name="bio"
            value={this.state.bio}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              resize: 'none',
              height: '100px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1DB954',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#17a446')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1DB954')}
        >
          Update Profile
        </button>
      </form>
    );
  }
}

export default EditProfile;