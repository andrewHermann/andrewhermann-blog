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
    updated_at: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper function to format date for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().slice(0, 16);
  };

  // Helper function to format date for API
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString();
  };

  useEffect(() => {
    console.log("PostEditor useEffect - id:", id, "isEditing:", isEditing);
    if (isEditing) {
      console.log("Calling fetchPost for id:", id);
      fetchPost();
    } else {
      console.log("Skipping fetchPost - creating new post");
      setError(""); // Clear any existing error
    }
  }, [id, isEditing]);

  const fetchPost = async () => {
    try {
      const response = await apiRequest(API_ENDPOINTS.ADMIN_POST(id));
      if (response.ok) {
        const data = await response.json();
        setPost({
          ...data,
          created_at: formatDateForInput(data.created_at),
          updated_at: formatDateForInput(data.updated_at)
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
    setPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setPost(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing 
        ? API_ENDPOINTS.ADMIN_POST(id)
        : API_ENDPOINTS.ADMIN_POSTS;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      // Format dates for API
      const postData = {
        ...post,
        created_at: formatDateForAPI(post.created_at),
        updated_at: formatDateForAPI(post.updated_at)
      };

      const response = await apiRequest(url, {
        method,
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setSuccess(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
        setTimeout(() => {
          navigate('/admin/posts');
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save post');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-editor-container">
      <div className="post-editor-header">
        <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        <Link to="/admin/posts" className="back-link">← Back to Posts</Link>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="post-editor-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={post.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={post.excerpt}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            rows="15"
            required
          />
        </div>

        <div className="date-fields">
          <div className="form-group">
            <label htmlFor="created_at">Created At</label>
            <input
              type="datetime-local"
              id="created_at"
              name="created_at"
              value={post.created_at}
              onChange={handleChange}
              placeholder="Leave empty for current time"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="updated_at">Updated At</label>
            <input
              type="datetime-local"
              id="updated_at"
              name="updated_at"
              value={post.updated_at}
              onChange={handleChange}
              placeholder="Leave empty for current time"
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="published"
              checked={post.published}
              onChange={handleChange}
            />
            Published
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="save-button">
            {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
          </button>
          <Link to="/admin/posts" className="cancel-button">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
