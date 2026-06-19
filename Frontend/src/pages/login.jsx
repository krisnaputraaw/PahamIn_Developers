import "./login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        username: response.data.username,
        role: response.data.role
      }));
      navigate('/');
    } catch {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">

        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Welcome back!</p>

        {error && (
          <div style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <MdEmail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-row">

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="/">Forgot Password?</a>

          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>

        </form>

        <div className="continue-text">
          or continue With
        </div>

        <div className="social-row">

          <button className="social-btn">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
            />
          </button>

          <button className="social-btn">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="Github"
            />
          </button>

          <button className="social-btn apple-btn">
            
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;