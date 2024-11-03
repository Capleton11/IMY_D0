import React from 'react';

class Comment extends React.Component {
  render() {
    const { user, text, image } = this.props.comment;

    const styles = {
      container: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
      },
      image: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '5px',
      },
      text: {
        margin: '5px 0',
      },
    };

    return (
      <div style={styles.container}>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Comment attachment"
            style={styles.image}
          />
        )}
        <div>
          <strong>{user}</strong>
          <p style={styles.text}>{text}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
