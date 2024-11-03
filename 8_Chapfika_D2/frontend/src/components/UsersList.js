import React from 'react';
import withNavigate from '../hocs/withNavigate';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        this.setState({ users: data });
      } else {
        this.setState({ error: 'Failed to fetch users' });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      this.setState({ error: 'An error occurred while fetching users' });
    }
  }

  handleAddFriend = async (friendId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    try {
      console.log(`Adding friend. User ID: ${userId}, Friend ID: ${friendId}`);
  
      const response = await fetch(`/api/users/${userId}/friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }),
      });
  
      if (response.ok) {
        const { friends } = await response.json();
        this.setState((prevState) => ({
          users: prevState.users.map(user =>
            user._id === friendId ? { ...user, friends: [...user.friends, userId] } : user
          ),
        }));
        alert('Friend added successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to add friend:', errorData.message);
        alert(`Failed to add friend: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('An error occurred while adding friend');
    }
  };
  
  handleViewProfile = (userId) => {
    this.props.navigate(`/profile/${userId}`);
  };

  render() {
    const { users, error } = this.state;
    const currentUserId = localStorage.getItem('userId');

    if (error) return <div>{error}</div>;

    return (
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} style={styles.userItem}>
              <div style={styles.userInfo}>
                <img
                  src={user.profilePicture || 'defaultProfilePic.jpg'}
                  alt={user.username}
                  style={styles.profilePic}
                />
                <span>{user.username}</span>
              </div>
              <div>
                {!user.friends.includes(currentUserId) && (
                  <button
                    onClick={() => this.handleAddFriend(user._id)}
                    style={styles.addFriendButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#17a446')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1DB954')}
                  >
                    Add Friend
                  </button>
                )}
                <button
                  onClick={() => this.handleViewProfile(user._id)}
                  style={styles.viewProfileButton}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  View Profile
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = {
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  addFriendButton: {
    backgroundColor: '#1DB954',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    marginRight: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  viewProfileButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default withNavigate(UserList);