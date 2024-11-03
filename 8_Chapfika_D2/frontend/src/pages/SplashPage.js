import React from 'react';
import { Link } from 'react-router-dom';
// u22554875 Capleton Chapfika

class SplashPage extends React.Component {
  render() {
    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      logo: {
        height: '60px',
      },
      linkButton: {
        marginRight: '15px',
        borderRadius: '10px',
      },
      button: {
        borderRadius: '5px',
      },
      mainContainer: {
        position: 'relative',
        height: 'calc(100vh - 60px)',
        background: `url(/assets/images/gradient.png) no-repeat center center`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'left',
        padding: '0px',
      },
      content: {
        maxWidth: '500px',
        marginBottom: '20px',
        marginLeft: '10%',
      },
      heading: {
        color: 'black',
      },
      actionButton: {
        backgroundColor: 'transparent',
        borderRadius: '20px',
      },
      actionButtonSignup: {
        color: '#ff1b6b',
      },
      actionButtonLogin: {
        color: '#45caff',
        borderBlockColor: '#B8F9E4',
      },
      tagline: {
        marginTop: '5%',
        marginLeft: '30%',
        color: 'black',
        fontStyle: 'italic',
      },
      secondaryLogo: {
        height: '70px',
        marginLeft: '10%',
      },
      overlayImages: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '20px',
      },
      image1: {
        width: '270px',
        height: '200px',
        objectFit: 'cover',
        marginBottom: '-50px',
        marginRight: '150%',
        zIndex: '1',
      },
      image2: {
        width: '270px',
        height: '200px',
        objectFit: 'cover',
        marginBottom: '100px',
        marginRight: '100%',
        zIndex: '0',
      },
      '@media (max-width: 768px)': {
        content: {
          maxWidth: '90%', // Adjust maxWidth for smaller screens
          marginLeft: '5%', // Reduce left margin on smaller screens
        },
        heading: {
          fontSize: '1.5rem', // Smaller font size for smaller screens
        },
        tagline: {
          marginLeft: '0%', // Reset left margin on smaller screens
        },
        image1: {
          width: '200px', // Smaller image sizes on mobile
          height: '150px',
        },
        image2: {
          width: '200px', // Smaller image sizes on mobile
          height: '150px',
        },
      },
      '@media (max-width: 480px)': {
        heading: {
          fontSize: '1.2rem', // Even smaller font size for very small screens
        },
        secondaryLogo: {
          height: '50px', // Adjust secondary logo size for small screens
        },
      },
    };

    return (
      <div>
        <header style={styles.header}>
          <img src="/assets/images/logo.png" alt="Logo" style={styles.logo} />
          <div>
            <Link to="/login" style={styles.linkButton}>
              <button style={styles.button}><strong>Login</strong></button>
            </Link>
            <Link to="/signup">
              <button style={styles.button}><strong>Sign Up</strong></button>
            </Link>
          </div>
        </header>

        <div style={styles.mainContainer}>
          <div style={styles.content}>
            <h2 style={styles.heading}>
              <strong>Immerse Yourself in <br />Blissful and Tasteful Music. <br />FREE MUSIC FOR ALL</strong>
            </h2>
            <div>
              <Link to="/signup" style={{ marginRight: '15px' }}>
                <button style={{ ...styles.actionButton, ...styles.actionButtonSignup }}>Sign Up</button>
              </Link>
              <Link to="/login">
                <button style={{ ...styles.actionButton, ...styles.actionButtonLogin }}>Login</button>
              </Link>
            </div>
            <div style={styles.tagline}>
              <h4>{`Discover a whole new universe with all 
              the features JiveTrove has to offer`}</h4>
              <img src="/assets/images/logo.png" alt="Logo" style={styles.secondaryLogo} />
            </div>
          </div>

          <div style={styles.overlayImages}>
            <img src="/assets/images/pic2imy.jpg" alt="Overlapping 1" style={styles.image1} />
            <img src="/assets/images/picimy.jpg" alt="Overlapping 2" style={styles.image2} />
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPage;
