import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const { login } = useAuth();
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      navigate('/admin');
    } else {
      setError('Tài khoản hoặc mật khẩu sai!');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h2>Đăng Nhập Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}>
          Đăng nhập
        </button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Tài khoản demo:<br />
        <strong>admin</strong> / <strong>admin123</strong>
      </p>
    </div>
  );
};

export default AdminLogin;