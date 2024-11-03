import React from 'react';
import Playlist from '../components/Playlist';
import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import Header from '../components/Header';
import Sidebar from '../components/HomePageSideBar';
import { user } from '../data'; // Import user data if necessary

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      playlist: null, // Hold the playlist data here
      loading: true,
      error: null,
    };

    // Placeholder playlist data
    this.placeholderPlaylist = {
      _id: 'placeholder-id', // Temporary ID
      name: 'Default Playlist',
      description: 'This is a placeholder playlist with no songs.',
      songs: [
        {
          title: 'All Girls Are The same',
          artist: 'Juice World',
          imageUrl: '/assets/images/juice cover.jpg',
          spotifyLink: 'https://open.spotify.com/track/7qiZfU4dYxE0t3w6m5Gg3e'
        },
        {
          title: 'Dont wanna die',
          artist: 'Logic',
          imageUrl: '/assets/images/logic.jpg',
          spotifyLink: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vX8kW5'
        },
        {
          title: 'Not Like Us',
          artist: 'Kendrick Lamar',
          imageUrl: '/assets/images/kend.jpg',
          spotifyLink: 'https://open.spotify.com/track/3or2R3RGoFdECJ5kpBF4Qo'
        }
        , {
          title: 'Ghost',
          artist: 'Justin Bieber',
          imageUrl: '/assets/images/justin.jpg',
          spotifyLink: 'https://open.spotify.com/track/7qiZfU4dYxE0t3w6m5Gg3e'
        },
        {
          title: 'Big Dawgs',
          artist: 'HunamanKind',
          imageUrl: '/assets/images/jjuice cover.jpg',
          spotifyLink: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vX8kW5'
        },
        {
          title: 'Levitating',
          artist: 'Logic',
          imageUrl: '/assets/images/jj.png',
          spotifyLink: 'https://open.spotify.com/track/3or2R3RGoFdECJ5kpBF4Qo'
        }
      ], // No songs in placeholder
      imageUrl: '/assets/images/logo.png', // Placeholder image
    };
  }

  async componentDidMount() {
    const { playlistId } = this.props; // Use playlistId passed from the wrapper
    if (playlistId) {
      try {
        const response = await fetch(`/api/playlists/${playlistId}`);
        if (response.ok) {
          const playlistData = await response.json();
          this.setState({ playlist: playlistData, loading: false });
        } else {
          this.setState({ error: 'Failed to load playlist', loading: false });
        }
      } catch (error) {
        this.setState({ error: 'An error occurred while fetching the playlist', loading: false });
      }
    } else {
      // If no playlistId, use the placeholder
      this.setState({ playlist: this.placeholderPlaylist, loading: false });
    }
  }
  
  addSongToPlaylist = async (songId) => {
    const { playlist } = this.state;
  
    try {
      const response = await fetch(`/api/playlists/${playlist._id}/song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const { songId: addedSongId } = await response.json();
  
      // Update the playlist's songs array by appending only the song ID
      this.setState((prevState) => ({
        playlist: {
          ...prevState.playlist,
          songs: [...prevState.playlist.songs, addedSongId],
        },
      }));
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };
  
//672501d795471592d12eea67
  removeSongFromPlaylist = async (songId) => {
    const { playlist } = this.state;
  
    // Update state locally by filtering out the removed song
    const updatedSongs = playlist.songs.filter(song => song._id !== songId);
    
    this.setState({ playlist: { ...playlist, songs: updatedSongs } });
  
    // Make the delete request to the server
    try {
      const response = await fetch(`/api/playlists/${playlist._id}/song`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error removing song:', error);
  
      // Rollback in case of an error
      this.setState({ playlist });
    }
  };
  

  editPlaylistInfo = async (name, description) => {
    const { playlist } = this.state;
    try {
      const response = await fetch(`/api/playlists/${playlist._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      const updatedPlaylist = await response.json();
      this.setState({ playlist: updatedPlaylist });
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  addComment = (commentText, image) => {
    const newComment = {
      id: this.state.comments.length + 1,
      user: 'Anonymous',
      text: commentText,
      image: image
    };
  
    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }));
  };

 
  render() {
    const { loading, error, playlist } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div style={styles.page}>
        <Sidebar user={user} />
        <div style={styles.mainContent}>
          <Header />
          <h1 style={styles.title}>Playlist Page</h1>
          <div style={styles.playlistContainer}>
            <Playlist playlist={playlist}
            addSong={this.addSongToPlaylist}
            removeSong={this.removeSongFromPlaylist}
            editPlaylistInfo={this.editPlaylistInfo} />
            <div style={styles.commentsSection}>
              <AddComment addComment={this.addComment} />
              <CommentList comments={this.state.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  page: {
    display: 'flex',
    backgroundImage: 'url("/assets/images/gradient.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '150vh',
  },
  mainContent: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
  playlistContainer: {
    position: 'relative',
    marginLeft: '14%',
    marginTop: '2px',
  },
  commentsSection: {
    marginTop: '40px',
  },
};

export default PlaylistPage;