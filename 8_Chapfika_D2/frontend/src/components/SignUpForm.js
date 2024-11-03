import React from 'react';
import { useNavigate } from 'react-router-dom';
import withNavigate from '../hocs/withNavigate';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: ''
      }
    };
  }

  validateForm = () => {
    const { name, email, password } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!name) {
      errors.name = 'Name is required.';
      formIsValid = false;
    }

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
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
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
      const { name, email, password } = this.state;

      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: name, email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Sign up successful:', data);
          // Handle successful sign-up (e.g., redirect, notify user, etc.)
          localStorage.setItem('userId', data.user._id); // Store user ID
          localStorage.setItem('token', data.token);
          this.props.navigate('/home');
        } else {
          const errorData = await response.json();
          console.error('Sign up failed:', errorData);
          // Handle error (e.g., display message)
          alert('Sign up failed: ' + errorData.message);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    }
  };

  render() {
    const { name, email, password, errors } = this.state;

    return (
      <div style={styles.background}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Sign Up</h2>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleInputChange}
                style={styles.input}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
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
            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  background: {
    background: `url(/assets/images/logo.png) no-repeat center center`,
    backgroundSize: "cover",
    paddingTop: '200px'
  },
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

export default withNavigate(SignUpForm);
