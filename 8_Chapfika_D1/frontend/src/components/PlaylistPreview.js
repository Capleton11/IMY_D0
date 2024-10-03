import React from 'react';
import withNavigate from '../hocs/withNavigate';


class PlaylistPreview extends React.Component {

  handleClick = () => {
    // Navigate to the PlaylistPage with the playlist ID
    this.props.navigate(`/playlist/${this.props.playlist._id}`);
  };
  render() {
    const { playlist } = this.props;

    return (
      <div onClick={this.handleClick}
      
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>{playlist.name}</h3>
        <p style={{ margin: '0 0 10px 0', color: '#555' }}>{playlist.description}</p>
        <p style={{ margin: 0, color: '#888' }}>Total Songs: {playlist.songs.length}</p>
      </div>
    );
  }
}

export default withNavigate(PlaylistPreview);