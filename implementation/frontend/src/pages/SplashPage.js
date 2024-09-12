import React from 'react';
import { Link } from 'react-router-dom';
//u22554875 Capleton Chapfika
class SplashPage extends React.Component {
  render() {
    return (
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
        <img src="/assets/images/logo.png" alt="Logo" style={{ height: '60px' }} />
          <div>
            <Link to="/login" style={{ marginRight: '15px' ,borderRadius: "10px"}}>
              <button style ={{ borderRadius: '5px'}}><strong>Login</strong></button>
            </Link>
            <Link to="/signup" >
              <button style ={{ borderRadius: '5px'}}><strong>Sign Up</strong></button>
            </Link>
          </div>
        </header>
        
        <div
          style={{
            position: 'relative',
            height: 'calc(100vh - 60px)', 
            background: `url(/assets/images/gradient.png) no-repeat center center`, 
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'left',
            padding: '0px'
          }}
        >
          <div style={{ maxWidth: '500px', marginBottom: '20px',marginLeft:'10%' }}>
            <h2 style={{color:"black"}}><strong>Immerse Yourself in <br></br>Blissful and Tasteful Music. <br></br>FREE MUSIC FOR ALL</strong></h2>
            <div>
              <Link to="/signup" style={{ marginRight: '15px' }}>
                <button style={{ backgroundColor: 'transparent', color: 'ff1b6b',borderRadius: '20px' }}>Sign Up</button>
              </Link>
              <Link to="/login">
                <button style={{ backgroundColor: 'transparent', color: '45caff',borderRadius: '20px',borderBlockColor:"#B8F9E4" }}>Login</button>
              </Link>
            </div>
            <div style = {{marginTop:"5%", marginLeft:'30%', color:"black",fontStyle: "italic"}}>
              <h4>{`Discover a whole new universe with all 
              the features JiveTrove has to offer`}</h4>
              <img src="/assets/images/logo.png" alt="Logo" style={{ height: '70px' ,marginLeft:'10%'}} />
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            right: '0',
            bottom: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '20px'
          }}>
            <img src="/assets/images/pic2imy.jpg" alt="Overlapping 1" style={{ width: '270px', height: '200px', objectFit: 'cover', marginBottom: '-50px',marginRight: '150%', zIndex: '1' }} />
            <img src="/assets/images/picimy.jpg" alt="Overlapping 2" style={{ width: '270px', height: '200px', objectFit: 'cover', marginBottom: '100px',marginRight: '100%',zIndex: '0' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPage;