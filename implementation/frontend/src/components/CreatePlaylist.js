import React from 'react';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle playlist creation logic here (for now, just log the new playlist)
    console.log('New Playlist:', this.state);
  };

  render() {
    return (
      <form 
        onSubmit={this.handleSubmit} 
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          margin: 'auto',
        }}
      >
        <h3 style={{ marginBottom: '20px', color: '#1DB954' }}>Create a New Playlist</h3>

        <div style={{ marginBottom: '15px' }}>
          <label 
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Playlist Name:
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '16px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label 
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Description:
          </label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '16px',
              resize: 'none',
              height: '100px',
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1DB954',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#17a446'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1DB954'}
        >
          Create Playlist
        </button>
      </form>
    );
  }
}

export default CreatePlaylist;