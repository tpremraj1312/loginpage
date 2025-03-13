import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = { email, password };
      console.log(userData)
      const endpoint = isSignUp ? '/api/signup' : '/api/login';
      
      const response = await axios.post(`http://localhost:3000${endpoint}`, userData);
      
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">
        {isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
      </button>
    </div>
  );
};

export default Login;