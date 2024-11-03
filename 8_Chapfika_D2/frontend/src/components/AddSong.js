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

  isValidSpotifyUrl(url) {
    const regex = /^https?:\/\/(www\.)?(open\.spotify\.com|spotify\.com)\/track\/[a-zA-Z0-9]{22}(\?.*)?$/;
    return regex.test(url);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { spotifyLink } = this.state;

    if (!this.isValidSpotifyUrl(spotifyLink)) {
      alert('Please enter a valid Spotify link.');
      return;
    }

    const newSong = this.state;
    this.props.addSong(newSong);
    this.setState({ title: '', artist: '', imageUrl: '', spotifyLink: '' });
  };

  render() {
    const { title, artist, imageUrl, spotifyLink } = this.state;

    const styles = {
      container: {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        margin: '20px auto',
      },
      heading: {
        textAlign: 'center',
        color: '#1DB954',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      },
      inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      },
      label: {
        fontWeight: 'bold',
      },
      input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
      },
      button: {
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
      },
    };

    return (
      <div style={styles.container}>
        <h3 style={styles.heading}>Add a New Song</h3>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Song Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Artist:</label>
            <input
              type="text"
              name="artist"
              value={artist}
              onChange={this.handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Spotify Link:</label>
            <input
              type="text"
              name="spotifyLink"
              value={spotifyLink}
              onChange={this.handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
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
