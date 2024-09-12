import React from 'react';
import Feed from './Feed';

class ProfileFeed extends React.Component {
  render() {
    const { songs, playlists } = this.props;
    return (
      <div>
        <h3>User's Playlists</h3>
        <Feed songs={songs} playlists={playlists} />
      </div>
    );
  }
}

export default ProfileFeed;