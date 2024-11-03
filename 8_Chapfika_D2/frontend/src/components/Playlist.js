import React from 'react';
import Song from './Song';
import Modal from './Modal';
class Playlist extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isEditModalOpen: false,
      isAddSongModalOpen: false,
      newName: '',
      newDescription: '',
      songIdToAdd: '',
    };
  }
  handleAddSong = () => {
    this.setState({ isAddSongModalOpen: true });
  };


  handleRemoveSong = (songId) => {
    this.props.removeSong(songId);
  };
  handleEditPlaylistInfo = () => {
    this.setState({ 
      newName: this.props.playlist.name, 
      newDescription: this.props.playlist.description, 
      isEditModalOpen: true 
    });
  };

  handleEditSubmit = () => {
    const { newName, newDescription } = this.state;
    if (newName && newDescription) {
      this.props.editPlaylistInfo(newName, newDescription);
      this.setState({ isEditModalOpen: false });
    }
  };

  handleAddSongSubmit = () => {
    const { songIdToAdd } = this.state;
    if (songIdToAdd) {
      this.props.addSong(songIdToAdd);
      this.setState({ isAddSongModalOpen: false, songIdToAdd: '' });
    }
  };
  render() {
    const { title, description, songs = [], imageUrl } = this.props.playlist || {};

    const playlistContainerStyle = {
      width: '100%',
      textAlign: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    };

    const imageContainerStyle = {
      position: 'relative',
      width: '100%',
      height: '50vh',
      overflow: 'hidden',
    };

    const playlistImageStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    };

    const titleStyle = {
      position: 'absolute',
      left: '20px',
      top: '20px',
      color: 'white',
      fontSize: '2rem',
      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
    };

    const descriptionContainerStyle = {
      marginTop: '20px',
      padding: '10px',
    };

    const songsContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
    };

    const buttonStyle = {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      margin: '5px',
    };

    const buttonHoverStyle = {
      ...buttonStyle,
      backgroundColor: '#0056b3',
    };

      return (
        <div style={playlistContainerStyle}>
          <div style={imageContainerStyle}>
            <img src={imageUrl} alt="Playlist Background" style={playlistImageStyle} />
            <h2 style={titleStyle}>{title}</h2>
          </div>
          <div style={descriptionContainerStyle}>
            <p>{description}</p>
            <button style={buttonStyle} onClick={this.handleEditPlaylistInfo}>Edit Playlist</button>
            <h3>Songs:</h3>
            <button style={buttonStyle} onClick={this.handleAddSong}>Add Song</button>
            <div style={songsContainerStyle}>
              {songs.map((song, index) => (
                <span key={song.id} style={{ display: 'flex', alignItems: 'center' }}>
                  {index + 1}{' '}
                  <Song song={song} />
                  <button style={buttonStyle} onClick={() => this.handleRemoveSong(song._id)}>Remove</button>
                </span>
              ))}
            </div>
          </div>
          
          {/* Edit Playlist Modal */}
          <Modal
            isOpen={this.state.isEditModalOpen}
            onClose={() => this.setState({ isEditModalOpen: false })}
            onSubmit={this.handleEditSubmit}
            title="Edit Playlist Info"
          >
            <input
              type="text"
              value={this.state.newName}
              onChange={(e) => this.setState({ newName: e.target.value })}
              placeholder="New Playlist Name"
              style={{ width: '100%', margin: '5px 0' }}
            />
            <input
              type="text"
              value={this.state.newDescription}
              onChange={(e) => this.setState({ newDescription: e.target.value })}
              placeholder="New Playlist Description"
              style={{ width: '100%', margin: '5px 0' }}
            />
          </Modal>
  
          {/* Add Song Modal */}
          <Modal
            isOpen={this.state.isAddSongModalOpen}
            onClose={() => this.setState({ isAddSongModalOpen: false })}
            onSubmit={this.handleAddSongSubmit}
            title="Add Song to Playlist"
          >
            <input
              type="text"
              value={this.state.songIdToAdd}
              onChange={(e) => this.setState({ songIdToAdd: e.target.value })}
              placeholder="Enter Song ID"
              style={{ width: '100%', margin: '5px 0' }}
            />
          </Modal>
        </div>
      );
    }
  }
  
  export default Playlist;