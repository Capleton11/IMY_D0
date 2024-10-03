import React from 'react';
import withNavigate from '../hocs/withNavigate';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
  }

  validateForm = () => {
    const { email, password } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!email) {
      errors.email = 'Email is required.';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
      formIsValid = false;
    }

    if (!password) {
      errors.password = 'Password is required.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { email, password } = this.state;

      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          // Store user ID and other relevant user information in localStorage
          localStorage.setItem('userId', data.user._id); // Store user ID
          localStorage.setItem('token', data.token); // Store token if needed
          this.props.navigate('/home');
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
          alert('Login failed: ' + errorData.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div style={{ 
        background: `url(/assets/images/logo.png) no-repeat center center`, 
        backgroundSize: "cover", 
        paddingTop: '200px'
      }}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Login</h2>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                style={styles.input}
              />
              {errors.password && <span style={styles.error}>{errors.password}</span>}
            </div>
            <button type="submit" style={styles.button}>Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  error: {
    color: 'red',
    fontSize: '0.875em'
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};

export default withNavigate(LoginForm);