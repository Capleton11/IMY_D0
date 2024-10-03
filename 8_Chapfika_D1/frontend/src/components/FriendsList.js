import React from 'react';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/users/${userId}/friends`);
      if (response.ok) {
        const friendsData = await response.json();
        this.setState({ friends: friendsData, loading: false });
      } else {
        this.setState({ error: 'Failed to fetch friends', loading: false });
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
      this.setState({ error: 'An error occurred while fetching friends', loading: false });
    }
  }

  handleUnfriend = async (friendId) => {
    const userId = localStorage.getItem('userId'); // Get current user ID from local storage
    try {
      const response = await fetch(`/api/users/${userId}/friend`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }), // Send friend ID in request body
      });

      if (response.ok) {
        this.setState((prevState) => ({
          friends: prevState.friends.filter(friend => friend._id !== friendId), // Update state
        }));
        alert('Friend removed successfully');
      } else {
        alert('Failed to remove friend');
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  render() {
    const { friends, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div style={{ padding: '20px' }}>
        <h2>Your Friends</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {friends.map(friend => (
            <li key={friend._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              {friend.username}
              <button onClick={() => this.handleUnfriend(friend._id)} style={{ marginLeft: '10px', backgroundColor: '#e63946', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Unfriend
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FriendsList;