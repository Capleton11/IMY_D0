import React from 'react';
import Profile from '../components/Profile';
import Header from '../components/Header';
import EditProfile from '../components/EditProfile';
import ProfileFeed from '../components/ProfileFeed';
import FollowerFollowing from '../components/FollowerFollowing';
import CreatePlaylist from '../components/CreatePlaylist';
import ProfileSidebar from '../components/ProfileSideBar';
import { user, dummySongs, userPlaylists, followers, following } from '../data';

class ProfilePage extends React.Component {
  render() {
    return (
      <div style={{
        backgroundImage: 'url("/assets/images/gradient.png")', // Example background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header />
        
        <div style={{
          display: 'flex', 
          flex: 1,
          padding: '20px',
          paddingTop:"50px"
        }}>
          {/* Sidebar */}
          <ProfileSidebar user={user} />
          
          {/* Main Profile Section */}
          <div style={{
            flex: 1,
            marginLeft: '20px', // Adds space between sidebar and profile content
            color: '#fff',  // Adjust text color for better readability
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
            borderRadius: '10px',
            padding: '20px',
          }}>
            <Profile user={user} />
            
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '20px',
              gap: '20px'
            }}>
              <div style={{ marginTop: '30px' }}>
              <ProfileFeed songs={dummySongs} playlists={userPlaylists} />
            </div>
            
             
            <div style={{ flex: 1 }}>
                <FollowerFollowing followers={followers} following={following} />
              </div>
              {/* Edit Profile and Followers/Following side by side */}
             

              
            </div>
            <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                marginTop: '30px'
              }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <EditProfile user={user} />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <CreatePlaylist />
                </div>
              </div>
             

            
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;