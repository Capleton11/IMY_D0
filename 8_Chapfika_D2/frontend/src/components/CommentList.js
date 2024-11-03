import React from 'react';
import Comment from './Comment';

class CommentList extends React.Component {
  render() {
    const { comments } = this.props;

    return (
      <div>
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: '10px' }}>
            <Comment comment={comment} />
          </div>
        ))}
      </div>
    );
  }
}

export default CommentList;
