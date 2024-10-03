import React from 'react';

class Song extends React.Component {
  render() {
    const { title, artist, imageUrl, spotifyLink } = this.props.song;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
        <img src={imageUrl} alt={`${title} cover`} style={{ width: '200px', height: '150px', marginBottom: '10px' }} />
        <div style={{ textAlign: 'center' }}>
          <strong>{title}</strong> - {artist}
        </div>
        <a href={spotifyLink} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', color: 'black' }}>
          Listen on Spotify
        </a>
      </div>
    );
  }
}

export default Song;