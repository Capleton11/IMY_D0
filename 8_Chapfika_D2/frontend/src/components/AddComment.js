import React, { Component } from 'react';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      image: null,
    };
  }

  handleTextChange = (e) => {
    this.setState({ commentText: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { commentText, image } = this.state;
    if (commentText.trim() || image) {
      this.props.addComment(commentText, image);
      this.setState({ commentText: '', image: null });
    }
  };

  render() {
    const { commentText } = this.state;

    const styles = {
      container: {
        marginBottom: '20px',
      },
      form: {
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
      },
      input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      },
      button: {
        padding: '10px 20px',
        backgroundColor: '#1db954',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },
    };

    return (
      <div style={styles.container}>
        <h3>Add a Comment</h3>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your Comment"
            value={commentText}
            onChange={this.handleTextChange}
            style={styles.input}
          />
          <input type="file" accept="image/*" onChange={this.handleImageChange} />
          <button type="submit" style={styles.button}>
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}

export default AddComment;
