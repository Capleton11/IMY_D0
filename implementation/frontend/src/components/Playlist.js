import React from 'react';
import Song from './Song';

class Playlist extends React.Component {
  render() {
    const { title, description, songs, imageUrl } = this.props.playlist;

    return (
      <div style={{  width: '100%', textAlign: 'center' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '50vh', 
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            alt="Playlist Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <h2 style={{ position: 'absolute', left: '20px', top: '20px', color: 'white' }}>{title}</h2>
        </div>
        <div style={{ marginTop: '20px' }}>
          <p>{description}</p>
          <h3>Songs:</h3>
          <div style={{display: 'flex',flexWrap: 'wrap', gap: '10px'}}>
            {songs.map((song, index) => (
              
                <span>{index + 1} 
                <Song key={song.id} song={song} />
                </span>
             
            ))}
          
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;