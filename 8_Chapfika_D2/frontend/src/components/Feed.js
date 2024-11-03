import React from 'react';
import Song from './Song';
import PlaylistPreview from './PlaylistPreview';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      playlists: [],
      users: [],
      loading: true,
      error: null,
      showSongs: true,
      showPlaylists: true,
      editSongId: null,
      editTitle: '',
      editArtist: '',
      editImageUrl: '',
      editSpotifyLink: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData();
    }
  }

  toggleSongs = () => {
    this.setState({ showSongs: true, showPlaylists: false });
  };

  togglePlaylists = () => {
    this.setState({ showSongs: false, showPlaylists: true });
  };

  async fetchData() {
    const { searchTerm } = this.props;
    this.setState({ loading: true, error: null });

    try {
      const [songResponse, playlistResponse, userResponse] = await Promise.all([
        fetch(`/api/songs?search=${searchTerm}`),
        fetch(`/api/playlists?search=${searchTerm}`),
        fetch(`/api/users/search?name=${searchTerm}`),
      ]);

      if (songResponse.ok && playlistResponse.ok && userResponse.ok) {
        const songsData = await songResponse.json();
        const playlistsData = await playlistResponse.json();
        const usersData = await userResponse.json();

        this.setState({
          songs: songsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          playlists: playlistsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          users: usersData,
        });
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'An error occurred while fetching data' });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDelete = async (id, type) => {
    const endpoint = type === 'song' ? `/api/songs/${id}` : `/api/playlists/${id}`;
    const response = await fetch(endpoint, { method: 'DELETE' });

    if (response.ok) {
      this.setState(prevState => ({
        [type === 'song' ? 'songs' : 'playlists']: prevState[type === 'song' ? 'songs' : 'playlists'].filter(item => item._id !== id),
      }));
      alert(`${type === 'song' ? 'Song' : 'Playlist'} deleted successfully`);
    } else {
      alert(`Failed to delete ${type === 'song' ? 'song' : 'playlist'}`);
    }
  };

  startEditSong = (song) => {
    this.setState({
      editSongId: song._id,
      editTitle: song.title,
      editArtist: song.artist,
      editImageUrl: song.imageUrl,
      editSpotifyLink: song.spotifyLink,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateSong = async () => {
    const { editSongId, editTitle, editArtist, editImageUrl, editSpotifyLink } = this.state;
    try {
      const response = await fetch(`/api/songs/${editSongId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          artist: editArtist,
          imageUrl: editImageUrl,
          spotifyLink: editSpotifyLink,
        }),
      });
  
      if (response.ok) {
        const updatedSong = await response.json();
        console.log('Updated song response:', updatedSong);  // Logging to confirm data structure
        this.setState((prevState) => ({
          songs: prevState.songs.map((song) =>
            song._id === editSongId ? updatedSong : song
          ),
          editSongId: null,
          editTitle: '',
          editArtist: '',
          editImageUrl: '',
          editSpotifyLink: '',
        }));
        alert('Song updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to update song:', errorData);
        alert(`Failed to update song: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating song:', error);
      alert('Error updating song. See console for details.');
    }
  };
  
  deleteSong = async (songId) => {
    try {
      const response = await fetch(`/api/${songId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.setState((prevState) => ({
          songs: prevState.songs.filter((song) => song._id !== songId),
        }));
        alert('Song deleted successfully');
      } else {
        alert('Failed to delete song');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  render() {
    const { songs, playlists, users, loading, error, showSongs, showPlaylists } = this.state;
    const { searchTerm } = this.props;
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <h2>Feed</h2>
        <div>
          <button onClick={this.toggleSongs} style={this.buttonStyle('blue')}>
            Songs
          </button>
          <button onClick={this.togglePlaylists} style={this.buttonStyle('green')}>
            Playlists
          </button>
        </div>

        {searchTerm && (
          <div>
            {users.length > 0 ? (
              users.map(user => <div key={user._id}>{user.username}</div>)
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {showSongs && this.renderSongs(songs)}
        {showPlaylists && this.renderPlaylists(playlists)}
      </div>
    );
  }

  buttonStyle(color) {
    const colors = {
      blue: { backgroundColor: '#007BFF', hoverColor: '#0056b3' },
      green: { backgroundColor: '#28A745', hoverColor: '#218838' },
    };

    return {
      backgroundColor: colors[color].backgroundColor,
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      marginRight: '10px',
      ':hover': {
        backgroundColor: colors[color].hoverColor,
      },
    };
  }
  renderSongs(songs) {
    const { editSongId, editTitle, editArtist, editImageUrl, editSpotifyLink } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h3>Songs</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {songs.length > 0 ? (
            songs.map(song => (
              <div key={song._id} style={{ position: 'relative' }}>
                <Song song={song} />
                <button onClick={() => this.handleDelete(song._id, 'song')} style={this.deleteButtonStyle()}>
                  Delete Song
                </button>
                {user && user.isAdmin && (
                  <>
                    <button onClick={() => this.startEditSong(song)} style={styles.editButton}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No songs found.</p>
          )}
          {editSongId && (
            <div style={styles.editForm}>
              <h3>Edit Song</h3>
              <input
                type="text"
                name="editTitle"
                value={editTitle}
                onChange={this.handleInputChange}
                placeholder="Title"
                style={styles.input}
              />
              <input
                type="text"
                name="editArtist"
                value={editArtist}
                onChange={this.handleInputChange}
                placeholder="Artist"
                style={styles.input}
              />
              <input
                type="text"
                name="editImageUrl"
                value={editImageUrl}
                onChange={this.handleInputChange}
                placeholder="Image URL"
                style={styles.input}
              />
              <input
                type="text"
                name="editSpotifyLink"
                value={editSpotifyLink}
                onChange={this.handleInputChange}
                placeholder="Spotify Link"
                style={styles.input}
              />
              <button onClick={this.updateSong} style={styles.saveButton}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderPlaylists(playlists) {
    return (
      <div>
        <h3>JiveTrove Playlists</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {playlists.length > 0 ? (
            playlists.map(playlist => (
              <div key={playlist._id} style={{ position: 'relative' }}>
                <PlaylistPreview playlist={playlist} />
                <button onClick={() => this.handleDelete(playlist._id, 'playlist')} style={this.deleteButtonStyle()}>
                  Delete Playlist
                </button>
              </div>
            ))
          ) : (
            <p>No playlists found.</p>
          )}
        </div>
      </div>
    );
  }

  deleteButtonStyle() {
    return {
      position: 'absolute',
      right: '0',
      top: '0',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      border: '1px solid #ff1a1a',
      borderRadius: '4px',
      padding: '6px 10px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    };
  }
}

const styles = {

  editForm: {
    marginTop: '15px',
    padding: '15px',
    border: '1px solid #007BFF',
    borderRadius: '5px',
    backgroundColor: '#e7f1ff',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  saveButton: {
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  editButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginLeft: '10px',
  },
};

export default Feed;
