import React from 'react';
import withNavigate from '../hocs/withNavigate';

class PlaylistPreview extends React.Component {
  handleClick = () => {
    // Navigate to the PlaylistPage with the playlist ID
    this.props.navigate(`/playlist/${this.props.playlist._id}`);
  };

  render() {
    const { playlist } = this.props;

    const playlistContainerStyle = {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      cursor: 'pointer', // Indicate that the div is clickable
    };

    const playlistTitleStyle = {
      color: 'black',
      margin: '0 0 10px 0',
    };

    const playlistDescriptionStyle = {
      margin: '0 0 10px 0',
      color: '#555',
    };

    const totalSongsStyle = {
      margin: 0,
      color: '#888',
    };

    return (
      <div onClick={this.handleClick} style={playlistContainerStyle}>
        <h3 style={playlistTitleStyle}>{playlist.name}</h3>
        <p style={playlistDescriptionStyle}>{playlist.description}</p>
       
      </div>
    );
  }
}

export default withNavigate(PlaylistPreview);
