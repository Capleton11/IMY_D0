import React from 'react';
import Song from './Song';
import PlaylistPreview from './PlaylistPreview';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [], // Songs fetched from the backend
      playlists: [], // Playlists fetched from the backend
      loading: true, // Track loading state
      error: null, // Track error state
    };
  }

  // Fetch all data when component mounts
  async componentDidMount() {
    this.fetchData();
  }

  // Fetch data again if the searchTerm changes
  async componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData();
    }
  }

  // Function to fetch data based on searchTerm
  async fetchData() {
    const { searchTerm } = this.props;
    this.setState({ loading: true, error: null });

    try {
      // Fetch songs and playlists from backend based on searchTerm
      const songResponse = await fetch(`/api/songs?search=${searchTerm}`);
      const playlistResponse = await fetch(`/api/playlists?search=${searchTerm}`);

      if (songResponse.ok && playlistResponse.ok) {
        const songsData = await songResponse.json();
        const playlistsData = await playlistResponse.json();
        this.setState({ songs: songsData, playlists: playlistsData });
      } else {
        throw new Error('Failed to fetch songs or playlists');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'An error occurred while fetching data' });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDeletePlaylist = async (playlistId) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      this.setState((prevState) => ({
        playlists: prevState.playlists.filter((playlist) => playlist._id !== playlistId),
      }));
      alert('Playlist deleted successfully');
    } else {
      alert('Failed to delete playlist');
    }
  };

  handleDeleteSong = async (songId) => {
    const response = await fetch(`/api/songs/${songId}`, {
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
  };

  render() {
    const { songs, playlists, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Display loading indicator
    }

    if (error) {
      return <div>Error: {error}</div>; // Display error message
    }

    return (
      <div>
        <h2>Feed</h2>

        {/* Songs Section */}
        <div>
          <h3>Songs</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {songs.length > 0 ? (
              songs.map((song) => (
                <div key={song._id} style={{ position: 'relative' }}>
                  <Song song={song} />
                  <button
  onClick={() => this.handleDeleteSong(song._id)}
  style={{
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor: '#ff4d4d', // Light red color
    color: '#fff', // White text
    border: '1px solid #ff1a1a', // Slightly darker red border
    borderRadius: '4px', // Slightly rounded corners
    padding: '6px 10px', // Padding for better size
    fontSize: '12px', // Smaller font size
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.2s', // Smooth transition for background color
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff1a1a')} // Darker red on hover
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4d4d')} // Revert to original color
>
  Delete Song
</button>
                </div>
              ))
            ) : (
              <p>No songs found.</p> // Message if no songs found
            )}
          </div>
        </div>

        {/* Playlists Section */}
        <div>
          <h3>JiveTrove Playlists</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div key={playlist._id} style={{ position: 'relative' }}>
                  <PlaylistPreview playlist={playlist} />
                  <button
  onClick={() => this.handleDeletePlaylist(playlist._id)}
  style={{
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor: '#ff4d4d', // Light red color
    color: '#fff', // White text
    border: '1px solid #ff1a1a', // Slightly darker red border
    borderRadius: '4px', // Slightly rounded corners
    padding: '6px 10px', // Padding for better size
    fontSize: '12px', // Smaller font size
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.2s', // Smooth transition for background color
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff1a1a')} // Darker red on hover
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4d4d')} // Revert to original color
>
  Delete Playlist
</button>
                </div>
              ))
            ) : (
              <p>No playlists found.</p> // Message if no playlists found
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;