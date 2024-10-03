import React from 'react';
import withNavigate from '../hocs/withNavigate';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/users'); // Fetch all users
      if (response.ok) {
        const usersData = await response.json();
        this.setState({ users: usersData, loading: false });
      } else {
        this.setState({ error: 'Failed to fetch users', loading: false });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      this.setState({ error: 'An error occurred while fetching users', loading: false });
    }
  }

  handleAddFriend = async (userId) => {
    const currentUserId = localStorage.getItem('userId');
    console.log(currentUserId);
    try {
      const response = await fetch(`/api/users/${currentUserId}/friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId: userId }),
      });
      if (response.ok) {
        alert('Friend added successfully');
      } else {
        alert('Failed to add friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  handleViewProfile = async (userId) => {
    const currentUserId = localStorage.getItem('userId'); // Save the current user ID
    localStorage.setItem('previousUserId', currentUserId); // Save the current user ID for restoration
    localStorage.setItem('userId', userId); // Update local storage with the new user's ID
    this.props.navigate(`/profile/${userId}`);
  };

  render() {
    const { users, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
          <li key={user._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ flex: 1 }}>{user.username}</span>
          
          <div>
            <button 
              onClick={() => this.handleAddFriend(user._id)} 
              style={{
                backgroundColor: '#1DB954', // Green color for the Add Friend button
                color: '#fff', // White text
                border: 'none', // No border
                borderRadius: '4px', // Rounded corners
                padding: '8px 12px', // Padding for size
                marginRight: '5px', // Spacing between buttons
                cursor: 'pointer', // Pointer cursor on hover
                transition: 'background-color 0.2s', // Smooth transition for background color
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#17a446'} // Darker green on hover
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1DB954'} // Revert on mouse out
            >
              Add Friend
            </button>
            
            <button 
              onClick={() => this.handleViewProfile(user._id)} 
              style={{
                backgroundColor: '#007bff', // Blue color for the View Profile button
                color: '#fff', // White text
                border: 'none', // No border
                borderRadius: '4px', // Rounded corners
                padding: '8px 12px', // Padding for size
                cursor: 'pointer', // Pointer cursor on hover
                transition: 'background-color 0.2s', // Smooth transition for background color
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // Darker blue on hover
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'} // Revert on mouse out
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

export default withNavigate(UsersList);