import React from 'react';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      initialSongId: '' // New field for an initial song ID to add to the playlist
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, imageUrl, initialSongId } = this.state;

    if (name && description) {
      // Pass the new playlist data (including the initial song ID) to the parent component's handler
      this.props.handleCreatePlaylist({ name, description, imageUrl, initialSongId });
      this.setState({ name: '', description: '', imageUrl: '', initialSongId: '' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  render() {
    const { name, description, imageUrl, initialSongId } = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Create a New Playlist</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Playlist Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={this.handleInputChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Image URL (optional):</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleInputChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Initial Song ID (optional):</label>
          <input
            type="text"
            name="initialSongId"
            value={initialSongId}
            onChange={this.handleInputChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#1DB954', color: '#fff', cursor: 'pointer' }}>
          Add Playlist
        </button>
      </form>
    );
  }
}

export default CreatePlaylist;