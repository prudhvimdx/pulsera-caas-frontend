import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  
  const navigateToSignup = () => {
    navigate('/signup');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!emailTouched) setEmailTouched(true);
    validateForm(event.target.value, password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!passwordTouched) setPasswordTouched(true);
    validateForm(email, event.target.value);
  };

  const validateForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);

    if (emailTouched) {
      setEmailError(emailRegex.test(email) ? '' : 'Invalid email format');
    }
    if (passwordTouched) {
      setPasswordError(passwordRegex.test(password) ? '' : 'Invalid password format');
    }
    setButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handleLogin = () => {
    // Call your API here using email and password
    // For example:
    fetch(process.env.REACT_APP_API_BASE_URL + '/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.ok);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Login failed!');
      }
    })
    .then(data => {
      // Handle API response
      console.log(data);
      navigate('/chat');
    })
    .catch(error => {
      // Handle error
      console.error(error);
      alert('Login failed. Please try again.'); // Show error popup
    });
  };

  return (
    <div style={LoginStyle}>
      <div style={BoxStyle}>
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
            ...LoginButtonStyle,
            backgroundColor: buttonDisabled ? '#cccccc' : '#234bd6'
          }}
          onClick={handleLogin}
          disabled={buttonDisabled}
        >
          Login
        </button>
        <button style={ForgotPasswordStyle} onClick={() => {/* Navigate to Forgot Password */}}>
          Forgot Password?
        </button>
        <button style={CreateAccountStyle} onClick={navigateToSignup}>
          Create Account
        </button>
      </div>
    </div>
  );
}



const LoginStyle = {
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

const LoginButtonStyle = {
  width: '90%',
  height: '40px',
  margin: '15px 15px 0px 15px',
  border: '2px solid #234bd6',
  borderRadius: '8px',
  fontSize: '20px',
  backgroundColor: '#234bd6',
  color: 'white',
  fontWeight: 'bold',
};


const ForgotPasswordStyle = {
  width: '30%',
  height: '30px',
  margin: '15px 15px 0px 15px',
  fontSize: '12px',
  border: 'none',
  color: '#234bd6',
};


const CreateAccountStyle = {
  width: '60%',
  height: '40px',
  margin: '15px 15px 15px 15px',
  border: '2px solid #23d65f',
  borderRadius: '8px',
  fontSize: '20px',
  backgroundColor: '#23d65f',
  color: 'white',
  fontWeight: 'bold',
};

export default Login;

