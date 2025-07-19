import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';

const UserEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'new';

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'reader'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchUser();
    }
  }, [id, isEditing]);

  const fetchUser = async () => {
    try {
      const response = await apiRequest(`${API_ENDPOINTS.ADMIN_USERS}/${id}`);
      if (response) {
        // apiRequest already returns JSON data
        setUser({ ...data, password: '' }); // Don't load password for security
      } else {
        setError('Failed to load user');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing 
        ? `${API_ENDPOINTS.ADMIN_USERS}/${id}`
        : API_ENDPOINTS.ADMIN_USERS;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const userData = isEditing 
        ? { username: user.username, email: user.email, role: user.role }
        : user;

      const response = await apiRequest(url, {
        method,
        body: JSON.stringify(userData),
      });

      if (response) {
        setSuccess(isEditing ? 'User updated successfully!' : 'User created successfully!');
        setTimeout(() => {
          navigate('/admin/users');
        }, 1500);
      } else {
        // apiRequest already returns JSON data
        setError(data.error || 'Failed to save user');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-editor-container">
      <div className="user-editor-header">
        <h1>{isEditing ? 'Edit User' : 'Create New User'}</h1>
        <Link to="/admin/users" className="back-link">← Back to Users</Link>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="user-editor-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        {!isEditing && (
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="reader">Reader</option>
            <option value="blogger">Blogger</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="save-button">
            {loading ? 'Saving...' : (isEditing ? 'Update User' : 'Create User')}
          </button>
          <Link to="/admin/users" className="cancel-button">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default UserEditor;
