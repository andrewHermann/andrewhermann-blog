import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './PostEditor.css';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'new';

  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    published: false,
    created_at: '',
    updated_at: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id, isEditing]);

  const fetchPost = async () => {
    try {
      const response = await apiRequest(`${API_ENDPOINTS.ADMIN_POSTS}/${id}`);
      if (response) {
        setPost({
          ...response,
          created_at: formatDateForInput(response.created_at),
          updated_at: formatDateForInput(response.updated_at),
        });
      } else {
        setError('Failed to load post');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setPost((prev) => ({
      ...prev,
      title,
      slug,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing ? `${API_ENDPOINTS.ADMIN_POSTS}/${id}` : API_ENDPOINTS.ADMIN_POSTS;
      const method = isEditing ? 'PUT' : 'POST';

      const postData = {
        ...post,
        created_at: formatDateForAPI(post.created_at),
        updated_at: formatDateForAPI(post.updated_at),
      };

      await apiRequest(url, {
        method,
        body: JSON.stringify(postData),
      });

      setSuccess(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      setTimeout(() => {
        navigate('/admin/posts');
      }, 1500);
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateString) =>
    dateString ? new Date(dateString).toISOString().slice(0, 16) : '';

  const formatDateForAPI = (dateString) =>
    dateString ? new Date(dateString).toISOString() : '';

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">
          <div className="section-card">
            <div className="page-header">
              <h1 className="page-title">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
              <div className="header-actions">
                <Link to="/admin/posts" className="btn btn-secondary">
                  ← Back to Posts
                </Link>
              </div>
            </div>
            <p className="page-subtitle">
              {isEditing
                ? 'Edit the details for your blog post below.'
                : 'Create a new blog post to share your thoughts with the world.'}
            </p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleTitleChange}
                    required
                    placeholder="Enter post title"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="slug" className="form-label">
                    Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={post.slug}
                    onChange={handleChange}
                    required
                    placeholder="post-slug"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="excerpt" className="form-label">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Brief description of your post..."
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                  rows="15"
                  required
                  placeholder="Write your post content here..."
                  className="form-textarea"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="created_at" className="form-label">
                    Created At
                  </label>
                  <input
                    type="datetime-local"
                    id="created_at"
                    name="created_at"
                    value={post.created_at}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <small className="form-help">Leave empty for current time</small>
                </div>

                <div className="form-group">
                  <label htmlFor="updated_at" className="form-label">
                    Updated At
                  </label>
                  <input
                    type="datetime-local"
                    id="updated_at"
                    name="updated_at"
                    value={post.updated_at}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <small className="form-help">Leave empty for current time</small>
                </div>
              </div>

              <div className="form-group">
                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    name="published"
                    checked={post.published}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-label">
                    Publish this post immediately
                  </span>
                </label>
                <small className="form-help">
                  Uncheck to save as draft
                </small>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
                </button>
                <Link to="/admin/posts" className="btn btn-secondary">
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

export default PostEditor;
