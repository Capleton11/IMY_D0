import React from 'react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name || '',
      bio: props.user.bio || '',
      profilePicture: props.user.profilePicture || '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        name: this.props.user.name || '',
        bio: this.props.user.bio || '',
        profilePicture: this.props.user.profilePicture || '',
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, bio, profilePicture } = this.state;
    this.props.handleProfileUpdate({ username: name, bio, profilePicture });
  };

  render() {
    const { name, bio, profilePicture } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        style={this.formStyle()}
      >
        <h3 style={this.headerStyle()}>Edit Profile</h3>

        {this.renderInput('Name', 'name', name)}
        {this.renderTextarea('Bio', 'bio', bio, '100px')}
        {this.renderInput('Profile Picture URL', 'profilePicture', profilePicture)}

        <button type="submit" style={this.buttonStyle()}>
          Update Profile
        </button>
      </form>
    );
  }

  formStyle() {
    return {
      backgroundColor: '#f4f4f4',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: 'auto',
    };
  }

  headerStyle() {
    return {
      marginBottom: '20px',
      color: '#1DB954',
    };
  }

  renderInput(label, name, value) {
    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={this.labelStyle()}>{label}:</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={this.handleChange}
          style={this.inputStyle()}
        />
      </div>
    );
  }

  renderTextarea(label, name, value, height) {
    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={this.labelStyle()}>{label}:</label>
        <textarea
          name={name}
          value={value}
          onChange={this.handleChange}
          style={{ ...this.inputStyle(), resize: 'none', height }}
        />
      </div>
    );
  }

  labelStyle() {
    return {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
    };
  }

  inputStyle() {
    return {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    };
  }

  buttonStyle() {
    return {
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
    };
  }
}

export default EditProfile;
