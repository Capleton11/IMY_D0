import React from 'react';
import Song from './Song';
import PlaylistPreview from './PlaylistPreview';

class Feed extends React.Component {
  render() {
    const { songs, playlists } = this.props;
    
    return (
      <div>
        <h2>Feed</h2>
        <div>
          <h3>Songs</h3>
          <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px' }}>
            {songs.map((song, index) => (
              <Song key={index} song={song} />
            ))}
          </div>
        </div>
        <div>
          <h3>JiveTrove Playlists</h3>
          <div style={{ display: 'flex', flexDirection: 'column',gap: '10px' }}>
            {playlists.map((playlist, index) => (
              <PlaylistPreview key={index} playlist={playlist} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;