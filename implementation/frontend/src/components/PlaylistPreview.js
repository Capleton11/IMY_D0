import React from 'react';

class PlaylistPreview extends React.Component {
  render() {
    const { playlist } = this.props;

    return (
      <div style={{
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
        <h3 style={{ margin: '0 0 10px 0' }}>{playlist.title}</h3>
        <p style={{ margin: '0 0 10px 0', color: '#555' }}>{playlist.description}</p>
        <p style={{ margin: 0, color: '#888' }}>Total Songs: {playlist.songCount}</p>
      </div>
    );
  }
}

export default PlaylistPreview;