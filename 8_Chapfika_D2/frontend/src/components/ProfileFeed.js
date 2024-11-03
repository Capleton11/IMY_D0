
import React from 'react';
import Song from './Song';
import PlaylistPreview from './PlaylistPreview';

class ProfileFeed extends React.Component {
  render() {
    const { songs, playlists } = this.props;

    return (
      <div>
        <h2>Feed</h2>

        {/* Songs Section */}
        <div>
          <h3>Songs</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {songs.length > 0 ? (
              songs.map((song) => <Song key={song._id} song={song} />)
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
                <PlaylistPreview key={playlist._id} playlist={playlist} />
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

export default ProfileFeed;