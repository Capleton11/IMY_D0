import React from 'react';

class Song extends React.Component {
  render() {
    const { title, artist, imageUrl, spotifyLink } = this.props.song;

    return (
      <div style={styles.container}>
        <img src={imageUrl} alt={`${title} cover`} style={styles.image} />
        <div style={styles.textContainer}>
          <strong>{title}</strong> - {artist}
        </div>
        <a href={spotifyLink} target="_blank" rel="noopener noreferrer" style={styles.link}>
          Listen on Spotify
        </a>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
  },
  image: {
    width: '200px',
    height: '150px',
    marginBottom: '10px',
  },
  textContainer: {
    textAlign: 'center',
  },
  link: {
    marginTop: '10px',
    color: 'black',
  },
};

export default Song;
