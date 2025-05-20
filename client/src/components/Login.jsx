import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import { Eye, EyeOff } from 'lucide-react';

export default function Login({ setdata, setUser }) {
  const [uname, setUname] = useState('');
  const [psw, setPsw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!uname.trim() || !psw.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/auth/login_auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname, psw }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', uname);
        localStorage.setItem('userType', data.userType);

        if (data.userType === 'admin') {
          setUser({ type: 'admin' });
          navigate('/AdminDashboard');
        } else {
          setUser({ type: 'faculty', ...data.user });
          setdata(data.user);
          navigate('/FacultyDashboard');
        }
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
            
          <h2>Login to Dashboard</h2>
          <p>Enter your credentials to access your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={login} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={psw}
                onChange={(e) => setPsw(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                className="icon-inside"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
