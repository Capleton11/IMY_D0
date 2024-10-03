import React from 'react';
import Profile from '../components/Profile';
import Header from '../components/Header';
import EditProfile from '../components/EditProfile';
import ProfileFeed from '../components/ProfileFeed';
import FollowerFollowing from '../components/FollowerFollowing';
import CreatePlaylist from '../components/CreatePlaylist';
import ProfileSidebar from '../components/ProfileSideBar';
import PlaylistEditForm from '../components/PlayListEditForm';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      songs: [], // User's songs
      playlists: [], // User's playlists
      followers: [],
      following: [],
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    let userId = localStorage.getItem('userId'); // Get the userId from localStorage

    // Check if there's a previous user ID and restore it
    const previousUserId = localStorage.getItem('previousUserId');
    if (previousUserId) {
      userId = previousUserId; // Restore the previous user ID
      localStorage.removeItem('previousUserId'); // Clear it after restoring
    }

    this.fetchUserData(userId); // Fetch data for the current user
  }

  fetchUserData = async (userId) => {
    try {
      const userResponse = await fetch(`/api/users/${userId}/profile`);
      if (userResponse.ok) {
        const userData = await userResponse.json();

        // Fetch user's playlists using the playlist IDs
        const playlists = await Promise.all(
          userData.playlists.map(async (playlist) => {
            const playlistId = playlist.$oid || playlist;
            const playlistResponse = await fetch(`/api/playlists/${playlistId}`);
            return playlistResponse.ok ? await playlistResponse.json() : null;
          })
        );

        // Fetch songs added by this user
        const songsResponse = await fetch(`/api/songs?addedBy=${userId}`);
        const songsData = songsResponse.ok ? await songsResponse.json() : [];

        this.setState({
          user: userData,
          songs: songsData,
          playlists: playlists.filter(Boolean),
          followers: userData.followers || [],
          following: userData.following || [],
          loading: false
        });
      } else {
        this.setState({ error: 'Failed to fetch user profile', loading: false });
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      this.setState({ error: 'An error occurred while fetching data', loading: false });
    }
  };

  // Create a new playlist and add it to state
  handleCreatePlaylist = async (newPlaylistData) => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      newPlaylistData.owner = userId; // Assign the owner field to the logged-in user

      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlaylistData)
      });

      if (response.ok) {
        const newPlaylist = await response.json();
        this.setState((prevState) => ({
          playlists: [...prevState.playlists, newPlaylist], // Append the new playlist to the existing list
        }));
        console.log('New playlist added:', newPlaylist);

        // Optionally add a song to the newly created playlist
        if (newPlaylistData.initialSongId) {
          this.addToPlaylist(newPlaylistData.initialSongId, newPlaylist._id);
        }
      } else {
        console.error('Failed to add new playlist');
      }
    } catch (error) {
      console.error('Error adding new playlist:', error);
    }
  };

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

  handleUpdatePlaylist = async (playlistId, updatedData) => {
    try {
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Send the updated data
      });
  
      if (response.ok) {
        const updatedPlaylist = await response.json();
        this.setState((prevState) => ({
          playlists: prevState.playlists.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist // Update the playlist in state
          ),
        }));
        alert('Playlist updated successfully');
      } else {
        alert('Failed to update playlist');
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  handleDeleteProfile = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Profile deleted successfully');
      // Optionally log the user out or redirect them
      localStorage.removeItem('userId');
      this.props.navigate('/'); // Navigate to home or login page
    } else {
      alert('Failed to delete profile');
    }
  };
  // Handler for adding a song to a playlist
  addToPlaylist = async (songId, playlistId) => {
    try {
      const response = await fetch(`/api/playlists/${playlistId}/song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ songId })
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        // Update the state with the updated playlist data
        this.setState((prevState) => ({
          playlists: prevState.playlists.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          ),
        }));
        console.log('Song added to playlist:', updatedPlaylist);
      } else {
        console.error('Failed to add song to playlist');
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  render() {
    const { user, songs, playlists, followers, following, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div style={{
        backgroundImage: 'url("/assets/images/gradient.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header />
        
        <div style={{ display: 'flex', flex: 1, padding: '20px', paddingTop: "50px" }}>
          <ProfileSidebar user={user} />

          <div style={{
            flex: 1,
            marginLeft: '20px',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            padding: '20px',
          }}>
            <Profile user={user} handleDeletePlaylist={this.handleDeletePlaylist} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '20px' }}>
              <div style={{ marginTop: '30px' }}>
                <ProfileFeed songs={songs} playlists={playlists} />
              </div>
              
              <div style={{ flex: 1 }}>
                <FollowerFollowing followers={followers} following={following} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <EditProfile user={user} handleProfileUpdate={this.handleProfileUpdate} />
              </div>
              <div style={{ flex: 1, minWidth: '300px' }}>
                {/* Pass the handler as a prop */}
                <CreatePlaylist handleCreatePlaylist={this.handleCreatePlaylist} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;