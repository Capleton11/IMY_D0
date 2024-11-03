import React from 'react';
import Sidebar from '../components/HomePageSideBar';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import Feed from '../components/Feed';
import AddSong from '../components/AddSong';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      songs: [],
      currentUser: null,
      allUsers: [], // Store all users
      showUserList: false, // Toggle user list visibility
      editUserId: null,
      editUsername: '',
      editEmail: '',
    };
  }

  async componentDidMount() {
    await this.fetchCurrentUser();
  }

  fetchCurrentUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/users/${userId}/profile`);
      if (response.ok) {
        const userData = await response.json();
        this.setState({ currentUser: userData });
      } else {
        console.error('Failed to fetch current user');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  fetchAllUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const users = await response.json();
        this.setState({ allUsers: users, showUserList: true });
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.setState((prevState) => ({
          allUsers: prevState.allUsers.filter((user) => user._id !== userId),
        }));
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  startEditUser = (user) => {
    this.setState({
      editUserId: user._id,
      editUsername: user.username,
      editEmail: user.email,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateUser = async () => {
    const { editUserId, editUsername, editEmail } = this.state;
    try {
      const response = await fetch(`/api/users/${editUserId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editUsername,
          email: editEmail,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        this.setState((prevState) => ({
          allUsers: prevState.allUsers.map((user) =>
            user._id === editUserId ? updatedUser : user
          ),
          editUserId: null,
          editUsername: '',
          editEmail: '',
        }));
        alert('User updated successfully');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  addSong = async (newSong) => {
    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        const addedSong = await response.json();
        this.setState((prevState) => ({
          songs: [...prevState.songs, addedSong],
        }));
        alert('Song added successfully');
      } else {
        alert('Failed to add song');
      }
    } catch (error) {
      console.error('Error adding song:', error);
      alert('An error occurred while adding the song');
    }
  };

  render() {
    const { searchTerm, currentUser , allUsers, showUserList,editUserId,editUsername, editEmail, } = this.state;

    return (
      <div style={styles.page}>
        <Header />
        <div style={styles.content}>
          {<Sidebar user={currentUser} />}
          <div style={styles.main}>
            <SearchInput
              value={searchTerm}
              handleSearch={this.handleSearch}
              placeholder="Search for songs, albums, artists..."
            />
            <Feed searchTerm={searchTerm} user={currentUser} />
            <AddSong addSong={this.addSong} />

             {/* Admin-only button to view users */}
             {currentUser && currentUser.isAdmin && (
              <button onClick={this.fetchAllUsers} style={styles.adminButton}>
                Show All Users
              </button>
            )}

{showUserList && (
              <div style={styles.userList}>
                {allUsers.map((user) => (
                  <div key={user._id} style={styles.userItem}>
                    {user.username}
                    {currentUser.isAdmin && (
                      <>
                        <button
                          onClick={() => this.startEditUser(user)}
                          style={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.deleteUser(user._id)}
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {editUserId && (
              <div style={styles.editForm}>
                <h3>Edit User</h3>
                <input
                  type="text"
                  name="editUsername"
                  value={editUsername}
                  onChange={this.handleInputChange}
                  placeholder="Username"
                  style={styles.input}
                />
                <input
                  type="email"
                  name="editEmail"
                  value={editEmail}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  style={styles.input}
                />
                <button onClick={this.updateUser} style={styles.saveButton}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundImage: `url('/assets/images/gradient.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  content: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  main: {
    flex: 1,
    padding: '20px',
    marginLeft: '15%',
  },

  adminButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  adminButtonHover: {
    backgroundColor: '#45a049',
  },
  userList: {
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  deleteButtonHover: {
    backgroundColor: '#c0392b',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  editForm: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default HomePage;
