import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './UserManager.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password change form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiRequest(API_ENDPOINTS.ADMIN_USERS);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Failed to load users');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await apiRequest(API_ENDPOINTS.ADMIN_USER(id), { method: 'DELETE' });
        if (response.ok) {
          setSuccess('User deleted successfully!');
          fetchUsers();
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to delete user');
        }
      } catch (err) {
        setError('Connection error: ' + err.message);
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setPasswordLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setPasswordLoading(false);
      return;
    }

    try {
      const response = await apiRequest(API_ENDPOINTS.CHANGE_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      if (response.ok) {
        setSuccess('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to change password');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#e74c3c';
      case 'blogger': return '#3498db';
      case 'reader': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="user-manager-container">
      <div className="user-manager-header">
        <h1>User Management</h1>
        <Link to="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="user-manager-content">
        {/* User List Section */}
        <div className="user-list-section">
          <div className="section-header">
            <h2>Manage Users</h2>
            <Link to="/admin/users/edit/new" className="add-user-button">Add New User</Link>
          </div>
          
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-table">
              {users.length === 0 ? (
                <div className="no-users">
                  <p>No users found. <Link to="/admin/users/edit/new">Create your first user</Link></p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email || 'N/A'}</td>
                        <td>
                          <span 
                            className="role-badge" 
                            style={{ backgroundColor: getRoleColor(user.role) }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>{formatDate(user.created_at)}</td>
                        <td>
                          <Link to={`/admin/users/edit/${user.id}`} className="edit-button">Edit</Link>
                          <button 
                            onClick={() => deleteUser(user.id)} 
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Password Change Section */}
        <div className="password-change-section">
          <h2>Change Your Password</h2>
          
          <form onSubmit={handlePasswordSubmit} className="password-change-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
                minLength="6"
              />
            </div>

            <button type="submit" disabled={passwordLoading} className="change-password-button">
              {passwordLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Role Information Section */}
        <div className="role-info-section">
          <h2>Role Permissions</h2>
          <div className="role-info-cards">
            <div className="role-card">
              <h3 style={{ color: getRoleColor('admin') }}>Admin</h3>
              <ul>
                <li>Full access to all features</li>
                <li>Can manage users and roles</li>
                <li>Can create, edit, and delete blog posts</li>
                <li>Can access all admin functions</li>
              </ul>
            </div>
            <div className="role-card">
              <h3 style={{ color: getRoleColor('blogger') }}>Blogger</h3>
              <ul>
                <li>Can create, edit, and delete blog posts</li>
                <li>Can access blog management features</li>
                <li>Cannot manage users or system settings</li>
              </ul>
            </div>
            <div className="role-card">
              <h3 style={{ color: getRoleColor('reader') }}>Reader</h3>
              <ul>
                <li>Can only read published blog posts</li>
                <li>Cannot access admin features</li>
                <li>Cannot create or edit content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
