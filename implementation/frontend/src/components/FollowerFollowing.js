import React from 'react';
import ProfilePreview from './ProfilePreview';

class FollowerFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllFollowers: false,
      showAllFollowing: false,
      visibleFollowers: 5,  // Initial number of visible followers
      visibleFollowing: 5,  // Initial number of visible followings
    };
  }

  toggleFollowers = () => {
    this.setState(prevState => ({
      showAllFollowers: !prevState.showAllFollowers,
      visibleFollowers: prevState.showAllFollowers ? 5 : this.props.followers.length  // Show all if expanded
    }));
  };

  toggleFollowing = () => {
    this.setState(prevState => ({
      showAllFollowing: !prevState.showAllFollowing,
      visibleFollowing: prevState.showAllFollowing ? 5 : this.props.following.length  // Show all if expanded
    }));
  };

  render() {
    const { followers, following } = this.props;
    const { showAllFollowers, showAllFollowing, visibleFollowers, visibleFollowing } = this.state;

    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Followers</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {followers.slice(0, visibleFollowers).map((follower, index) => (
              <ProfilePreview key={index} user={follower} />
            ))}
          </div>
          {followers.length > 5 && (
            <button onClick={this.toggleFollowers} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
              {showAllFollowers ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        
        <div>
          <h3>Following</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {following.slice(0, visibleFollowing).map((followed, index) => (
              <ProfilePreview key={index} user={followed} />
            ))}
          </div>
          {following.length > 5 && (
            <button onClick={this.toggleFollowing} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
              {showAllFollowing ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default FollowerFollowing;