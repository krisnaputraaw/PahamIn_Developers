import "./login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="login-overlay">
      <div className="login-modal">

        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Welcome back!</p>

        <form>

          <div className="input-box">
            <MdEmail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="login-row">

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="/">Forgot Password?</a>

          </div>

          <button type="submit" className="login-button">
            Login
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