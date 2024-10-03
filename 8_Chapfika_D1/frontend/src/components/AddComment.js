import React, { useState } from 'react';

function AddComment({ addComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(commentText); // Call the function passed as prop
      setCommentText(''); // Clear the input after submitting
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Your Comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#1db954',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}

export default AddComment;