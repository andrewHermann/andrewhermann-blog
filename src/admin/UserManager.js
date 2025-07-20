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
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiRequest(API_ENDPOINTS.ADMIN_USERS);
      setUsers(data);
      setError('');
    } catch (err) {
      console.log('Error loading users:', err);
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiRequest(`${API_ENDPOINTS.ADMIN_USERS}/${id}`, { method: 'DELETE' });
        setSuccess('User deleted successfully!');
        fetchUsers();
        setError('');
      } catch (err) {
        console.log('Error deleting user:', err);
        setError('Connection error: ' + err.message);
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
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
      await apiRequest(API_ENDPOINTS.CHANGE_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      setSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.log('Error changing password:', err);
      setError('Connection error: ' + err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#e74c3c';
      case 'blogger':
        return '#3498db';
      case 'reader':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">
          {/* Page Header */}
          <div className="section-card">
            <div className="page-header">
              <h1 className="page-title">User Management</h1>
              <div className="header-actions">
                <Link to="/admin/dashboard" className="btn btn-secondary">
                  ← Back to Dashboard
                </Link>
              </div>
            </div>
            <p className="page-subtitle">
              Manage user accounts, roles, and change your password from this panel.
            </p>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>

          {/* User Management Cards Grid */}
          <div className="card-grid">
            {/* User List Section */}
            <div className="section-card">
              <div className="header-actions">
                <h2>Manage Users</h2>
                <Link to="/admin/users/edit/new" className="btn btn-primary">
                  Add New User
                </Link>
              </div>

              {loading ? (
                <div className="loading-message">Loading users...</div>
              ) : (
                <div className="table-container">
                  {users.length === 0 ? (
                    <div className="empty-state">
                      <p>
                        No users found.{' '}
                        <Link to="/admin/users/edit/new" className="link-primary">Create your first user</Link>
                      </p>
                    </div>
                  ) : (
                    <div className="data-table">
                      <table className="table">
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
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="item-title">{user.username}</div>
                              </td>
                              <td>{user.email || 'N/A'}</td>
                              <td>
                                <span
                                  className="role-badge"
                                  style={{ backgroundColor: getRoleColor(user.role) }}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="date-cell">{formatDate(user.created_at)}</td>
                              <td>
                                <div className="action-buttons">
                                  <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-secondary">
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => deleteUser(user.id)}
                                    className="btn btn-sm btn-danger"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Password Change Section */}
            <div className="section-card">
              <h2>Change Your Password</h2>
              <form onSubmit={handlePasswordSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="currentPassword" className="form-label">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter current password"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter new password"
                    minLength="6"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Confirm new password"
                    minLength="6"
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={passwordLoading} className="btn btn-primary">
                    {passwordLoading ? 'Changing Password...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Role Information Section - Full Width */}
          <div className="section-card">
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
    </div>
  );
};

export default UserManager;
