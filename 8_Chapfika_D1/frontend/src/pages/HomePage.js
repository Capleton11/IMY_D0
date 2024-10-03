import React from 'react';
import Sidebar from '../components/HomePageSideBar';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import Feed from '../components/Feed';
import AddSong from '../components/AddSong';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      songs: [],
      currentUser: null, // State to hold the current user's data
    };
  }

  async componentDidMount() {
    await this.fetchCurrentUser();
  }

  fetchCurrentUser = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Get the current user ID from localStorage
      const response = await fetch(`/api/users/${userId}`); // Fetch user details
      if (response.ok) {
        const userData = await response.json();
        this.setState({ currentUser: userData }); // Update state with user data
      } else {
        console.error('Failed to fetch current user');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  addSong = async (newSong) => {
    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        const addedSong = await response.json();
        this.setState((prevState) => ({
          songs: [...prevState.songs, addedSong], // Update songs in state
        }));
        alert('Song added successfully');
      } else {
        alert('Failed to add song');
      }
    } catch (error) {
      console.error('Error adding song:', error);
      alert('An error occurred while adding the song');
    }
  };

  render() {
    const { searchTerm, currentUser } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundImage: `url('/assets/images/gradient.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
          {<Sidebar user={currentUser} />} {/* Pass current user to Sidebar */}
          <div style={{ flex: 1, padding: '20px', marginLeft: '15%' }}>
            <SearchInput
              value={searchTerm}
              handleSearch={this.handleSearch}
              placeholder="Search for songs, albums, artists..."
            />
            <Feed searchTerm={searchTerm} />
            <AddSong addSong={this.addSong} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;