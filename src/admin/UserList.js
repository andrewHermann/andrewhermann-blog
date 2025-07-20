import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        fetchUsers(); // Reload the list
        setError('');
      } catch (err) {
        console.log('Error deleting user:', err);
        setError('Connection error: ' + err.message);
      }
    }
  };

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">
          <div className="section-card">
            <div className="page-header">
              <h1 className="page-title">Users</h1>
              <div className="header-actions">
                <Link to="/admin/users/new" className="btn btn-primary">Add New User</Link>
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
              <div className="loading-message">Loading users...</div>
            ) : (
              <div className="table-container">
                <div className="data-table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
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
                            <span className="role-badge" style={{ backgroundColor: '#3498db' }}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-secondary">
                                Edit
                              </Link>
                              <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
