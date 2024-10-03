import React from 'react';

class AddSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      imageUrl: '',
      spotifyLink: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newSong = this.state;
    this.props.addSong(newSong); // Call the addSong function passed as a prop
    this.setState({ title: '', artist: '', imageUrl: '', spotifyLink: '' }); // Clear form
  };

  render() {
    const { title, artist, imageUrl, spotifyLink } = this.state;

    return (
      <div style={{
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        margin: '20px auto',
      }}>
        <h3 style={{ textAlign: 'center', color: '#1DB954' }}>Add a New Song</h3>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Song Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Artist:</label>
            <input
              type="text"
              name="artist"
              value={artist}
              onChange={this.handleInputChange}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleInputChange}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Spotify Link:</label>
            <input
              type="text"
              name="spotifyLink"
              value={spotifyLink}
              onChange={this.handleInputChange}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#1DB954',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              marginTop: '10px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#17a446')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#1DB954')}
          >
            Add Song
          </button>
        </form>
      </div>
    );
  }
}

export default AddSong;