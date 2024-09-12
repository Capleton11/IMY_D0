import React from 'react';
import Sidebar from '../components/HomePageSideBar';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput'; // Ensure you have this component
import Feed from '../components/Feed';
import { dummySongs, dummyPlaylists } from '../data'; // Ensure you have these

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm } = this.state;
    
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        backgroundImage: `url('/assets/images/gradient.png')`, // Full-page background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <Header />
        <div style={{ display: 'flex', flex: 1,position:'relative' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px',marginLeft:"15%" }}>
            <SearchInput handleSearch={this.handleSearch} />
            <Feed songs={dummySongs} playlists={dummyPlaylists} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;