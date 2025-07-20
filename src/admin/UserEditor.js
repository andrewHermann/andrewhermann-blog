import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './UserEditor.css';

const UserEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'new';

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'reader',
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
        setUser({ ...response, password: '' }); // Don't load password for security
      } else {
        setError('Failed to load user');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing ? `${API_ENDPOINTS.ADMIN_USERS}/${id}` : API_ENDPOINTS.ADMIN_USERS;
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
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'admin':
        return 'Full access to all features and user management';
      case 'blogger':
        return 'Can create, edit, and delete blog posts';
      case 'reader':
        return 'Can only read published blog posts';
      default:
        return '';
    }
  };

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">
          <div className="section-card">
            <div className="page-header">
              <h1 className="page-title">{isEditing ? 'Edit User' : 'Create New User'}</h1>
              <div className="header-actions">
                <Link to="/admin/users" className="btn btn-secondary">
                  ← Back to Users
                </Link>
              </div>
            </div>
            <p className="page-subtitle">
              {isEditing
                ? 'Update user information and permissions.'
                : 'Create a new user account with appropriate permissions.'}
            </p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter username"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              {!isEditing && (
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Enter secure password"
                    className="form-input"
                  />
                  <small className="form-help">
                    Password must be at least 6 characters long
                  </small>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="reader">Reader</option>
                  <option value="blogger">Blogger</option>
                  <option value="admin">Admin</option>
                </select>
                <small className="form-help">
                  {getRoleDescription(user.role)}
                </small>
              </div>

              {isEditing && (
                <div className="info-card">
                  <h3>Security Note</h3>
                  <p>
                    For security reasons, passwords cannot be viewed or edited here. 
                    Users must use the password change feature to update their passwords.
                  </p>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
                </button>
                <Link to="/admin/users" className="btn btn-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditor;
