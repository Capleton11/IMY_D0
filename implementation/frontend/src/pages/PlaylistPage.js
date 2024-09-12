import React from 'react';
import Playlist from '../components/Playlist';
import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import Header from '../components/Header';
import Sidebar from '../components/HomePageSideBar';
import { user } from '../data';

//u22554875 Capleton Chapfika
class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        { id: 1, user: 'User1', text: 'Great playlist!' },
        { id: 2, user: 'User2', text: 'Nice selection!' },
      ],
    };
  }

  addComment = (commentText) => {
    const newComment = {
      id: this.state.comments.length + 1,
      user: 'Anonymous', 
      text: commentText,
    };

    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }));
  };

  render() {
    const dummyPlaylist = {
      id: 1,
      title: 'My Playlist',
      description: 'This is a playlist description.',
      imageUrl: '/assets/images/juice cover.jpg',
      songs: [
        { id: 1, title: 'Song 1', artist: 'Artist 1', imageUrl: '/assets/images/jj.png' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', imageUrl: '/assets/images/jj.png' },
      ],
      comments: [
        { id: 1, user: 'User1', text: 'Great playlist!' },
        { id: 2, user: 'User2', text: 'Nice selection!' },
      ],
    };

    return (
      <div style={{
        display: 'flex',
        backgroundImage: 'url("/assets/images/gradient.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '150vh',
      }}>
        <Sidebar  user={user} />
        <div style={{ flex: 1 }}>
          <Header />
          <h1 style={{ textAlign: 'center', color: 'white' }}>Playlist Page</h1>
          <div style={{
            position: 'relative',
            marginLeft: '14%',
            marginTop:"2px"
            
          }}>
            <Playlist playlist={dummyPlaylist} />
            <div style={{ marginTop: '40px' }}>
              <AddComment addComment={this.addComment}/>
              <CommentList comments={this.state.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistPage;