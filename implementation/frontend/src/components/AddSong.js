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
    // Call a function passed as props to add the new song (parent will handle it)
    this.props.addSong(newSong);
    this.setState({ title: '', artist: '', imageUrl: '', spotifyLink: '' }); // Clear form
  };

  render() {
    const { title, artist, imageUrl, spotifyLink } = this.state;

    return (
      <div>
        <h3>Add a New Song</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Song Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label>Artist:</label>
            <input
              type="text"
              name="artist"
              value={artist}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Spotify Link:</label>
            <input
              type="text"
              name="spotifyLink"
              value={spotifyLink}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Add Song</button>
        </form>
      </div>
    );
  }
}

export default AddSong;