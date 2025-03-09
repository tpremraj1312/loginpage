import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      let response;
      if (isSignUp) {
        // Sign Up API Call
        // Example: Make sure the URL is correct
        const response = await axios.post('http://localhost:5174/api/signup', userData);
      } else {
        // Login API Call
        // Example: Make sure the URL is correct
        const response = await axios.post('http://localhost:5174/api/login', userData);
      }

      if (response.data.success) {
        navigate('/dashboard'); // Redirect to dashboard after successful login/signup
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
      </button>
    </div>
  );
};

export default Login;