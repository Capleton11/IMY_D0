import React from 'react';

class AddToPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: '',
    };
  }

  handlePlaylistChange = (e) => {
    this.setState({ selectedPlaylist: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedPlaylist } = this.state;
    // Pass the selected playlist and the song ID (received through props) to the parent
    this.props.addToPlaylist(this.props.songId, selectedPlaylist);
    this.setState({ selectedPlaylist: '' }); // Clear selection after submission
  };

  render() {
    const { selectedPlaylist } = this.state;
    const { playlists } = this.props; // Array of available playlists passed via props

    return (
      <div>
        <h3>Add to Playlist</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Select Playlist:</label>
            <select
              value={selectedPlaylist}
              onChange={this.handlePlaylistChange}
              required
            >
              <option value="">Select...</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add to Playlist</button>
        </form>
      </div>
    );
  }
}

export default AddToPlaylist;