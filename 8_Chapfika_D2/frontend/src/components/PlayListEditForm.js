import React from 'react';

class PlaylistEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.playlist.name || '',
      description: props.playlist.description || '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    const { playlist, onUpdate } = this.props; // onUpdate is passed from ProfilePage
    onUpdate(playlist._id, { name, description }); // Call the update handler
  };

  render() {
    const { name, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={description} onChange={this.handleChange} required />
        </div>
        <button type="submit">Update Playlist</button>
      </form>
    );
  }
}

export default PlaylistEditForm;