import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!emailTouched) setEmailTouched(true);
    validateForm(event.target.value, password, firstName, lastName);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!passwordTouched) setPasswordTouched(true);
    validateForm(email, event.target.value, firstName, lastName);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (!firstNameTouched) setFirstNameTouched(true);
    validateForm(email, password, event.target.value, lastName);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (!lastNameTouched) setLastNameTouched(true);
    validateForm(email, password, firstName, event.target.value);
  };

  const validateForm = (email, password, first_name, last_name) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const NameRegex = /.{3,}/

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const isFirstNameValid = NameRegex.test(first_name);
    const isLastNameValid = NameRegex.test(last_name);

    if (emailTouched) {
      setEmailError(emailRegex.test(email) ? '' : 'Invalid email format');
    }
    if (passwordTouched) {
      setPasswordError(passwordRegex.test(password) ? '' : 'Invalid password format');
    }
    if (firstNameTouched) {
      setFirstNameError(NameRegex.test(first_name) ? '' : 'Invalid First Name');
    }
    if (lastNameTouched) {
      setLastNameError(NameRegex.test(last_name) ? '' : 'Invalid Last Name');
    }
    setButtonDisabled(!(isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid));
  };

  const handleSignup = () => {
    fetch(process.env.REACT_APP_API_BASE_URL + '/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Signup failed');
        }
      })
      .then(data => {
        // Handle API response
        console.log(data);
        navigate('/login');
      })
      .catch(error => {
        // Handle error
        console.error(error);
        alert('Signup failed. Please try again.'); // Show error popup
      });
  };

  return (
    <div style={SignupStyle}>
      <div style={BoxStyle}>
        <input
          style={InputStyle}
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          onBlur={() => setFirstNameTouched(true)}
        />
        {firstNameTouched && <div style={{ color: 'red' }}>{firstNameError}</div>}
        <input
          style={InputStyle}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          onBlur={() => setLastNameTouched(true)}
        />
        {lastNameTouched && <div style={{ color: 'red' }}>{lastNameError}</div>}
        <input
          style={InputStyle}
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setEmailTouched(true)}
        />
        {emailTouched && <div style={{ color: 'red' }}>{emailError}</div>}
        <input
          style={InputStyle}
          type="Password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => setPasswordTouched(true)}
        />
        {passwordTouched && <div style={{ color: 'red' }}>{passwordError}</div>}
        <button
          style={{
            ...CreateAccountButtonStyle,
            backgroundColor: buttonDisabled ? '#cccccc' : '#234bd6'
          }}
          onClick={handleSignup}
          disabled={buttonDisabled}
        >
          Create Account
        </button>
        <div style={LoginTextStyle}>
          Already have an account?{' '}
          <span style={LoginLinkStyle} onClick={navigateToLogin}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}



const SignupStyle = {
    width: '66%',
    marginTop: '13%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const BoxStyle = {
  width: '50%',
  backgroundColor: '#EEEEEE',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
};

const InputStyle = {
  width: '90%',
  height: '40px',
  margin: '15px 15px 0px 15px',
  border: '2px solid #234bd6',
  borderRadius: '8px',
  fontSize: '16px',
  padding: '0 0 0 12px'
};

const CreateAccountButtonStyle = {
  width: '90%',
  height: '40px',
  margin: '15px 15px 15px 15px',
  border: '2px solid #234bd6',
  borderRadius: '8px',
  fontSize: '20px',
  backgroundColor: '#234bd6',
  color: 'white',
  fontWeight: 'bold',
};

const LoginTextStyle = {
  textAlign: 'center',
  margin: '5px 15px 10px 15px', 
};

const LoginLinkStyle = {
  color: '#234bd6',
  cursor: 'pointer',
};

export default Signup;

