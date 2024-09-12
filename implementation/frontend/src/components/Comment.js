import React from 'react';

class Comment extends React.Component {
  render() {
    const { user, text } = this.props.comment;

    return (
      <div>
        <strong>{user}</strong>: {text}
      </div>
    );
  }
}

export default Comment;