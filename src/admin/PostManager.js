import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './PostManager.css';

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiRequest(API_ENDPOINTS.ADMIN_POSTS);
      if (response) {
        // apiRequest already returns JSON data
        setPosts(response);
        setError('');
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiRequest(`${API_ENDPOINTS.ADMIN_POSTS}/${id}`, {
          method: 'DELETE',
        });
        setSuccess('Post deleted successfully!');
        fetchPosts(); // Refresh the list
      } catch (err) {
        setError('Connection error: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="page-container admin-page">
        <div className="page-content">
          <div className="content-main">
            <div className="section-card">
              <div className="loading-message">Loading posts...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">
          {/* Page Header */}
          <div className="section-card">
            <div className="page-header">
              <h1 className="page-title">Manage Posts</h1>
              <div className="header-actions">
                <Link to="/admin/dashboard" className="btn btn-secondary">
                  ← Back to Dashboard
                </Link>
                <Link to="/admin/posts/edit/new" className="btn btn-primary">
                  Create New Post
                </Link>
              </div>
            </div>
            <p className="page-subtitle">
              Create, edit, and manage all your blog posts from this panel.
            </p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>

          {/* Posts Table */}
          <div className="section-card">
            <div className="table-container">
              {posts.length === 0 ? (
                <div className="empty-state">
                  <h3>No Posts Found</h3>
                  <p>
                    You haven't created any posts yet. <Link to="/admin/posts/edit/new" className="link-primary">Create your first post</Link> to get started.
                  </p>
                </div>
              ) : (
                <div className="data-table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td>
                            <div className="item-title">{post.title}</div>
                            {post.excerpt && (
                              <div className="item-subtitle">{post.excerpt}</div>
                            )}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="date-cell">{formatDate(post.created_at)}</td>
                          <td className="date-cell">{formatDate(post.updated_at)}</td>
                          <td>
                            <div className="action-buttons">
                              <Link to={`/admin/posts/edit/${post.id}`} className="btn btn-sm btn-secondary">
                                Edit
                              </Link>
                              {post.published && (
                                <Link to={`/blog/${post.slug}`} className="btn btn-sm btn-outline" target="_blank">
                                  View
                                </Link>
                              )}
                              <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger">
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
          </div>

          {/* Quick Stats */}
          {posts.length > 0 && (
            <div className="section-card">
              <h2>Blog Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{posts.length}</div>
                  <div className="stat-label">Total Posts</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{posts.filter(p => p.published).length}</div>
                  <div className="stat-label">Published</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{posts.filter(p => !p.published).length}</div>
                  <div className="stat-label">Drafts</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostManager;
