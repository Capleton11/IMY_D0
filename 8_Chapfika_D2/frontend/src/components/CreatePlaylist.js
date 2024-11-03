import React from 'react';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      initialSongId: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, imageUrl, initialSongId } = this.state;

    const playlistName = name || 'NewPlaylist'; // Default name if not provided

    if (description) {
      this.props.handleCreatePlaylist({ name: playlistName, description, imageUrl, initialSongId });
      this.setState({ name: '', description: '', imageUrl: '', initialSongId: '' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  render() {
    const { name, description, imageUrl, initialSongId } = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={this.formStyle()}>
        <h3>Create a New Playlist</h3>

        {this.renderInput('Playlist Name:', 'name', name, false)}
        {this.renderTextarea('Description:', 'description', description, true)}
        {this.renderInput('Image URL (optional):', 'imageUrl', imageUrl, false)}
        {this.renderInput('Initial Song ID (optional):', 'initialSongId', initialSongId, false)}

        <button type="submit" style={this.buttonStyle()}>
          Add Playlist
        </button>
      </form>
    );
  }

  formStyle() {
    return {
      margin: '20px 0',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
    };
  }

  renderInput(label, name, value, required = false) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <label>{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={this.handleInputChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          required={required}
        />
      </div>
    );
  }

  renderTextarea(label, name, value, required = false) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <label>{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={this.handleInputChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          required={required}
        />
      </div>
    );
  }

  buttonStyle() {
    return {
      padding: '10px',
      backgroundColor: '#1DB954',
      color: '#fff',
      cursor: 'pointer',
    };
  }
}

export default CreatePlaylist;
