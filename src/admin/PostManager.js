import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, apiRequest } from '../config/api'
import './PostManager.css'

const PostManager = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await apiRequest(API_ENDPOINTS.ADMIN_POSTS)
      if (response) {
        // apiRequest already returns JSON data
        setPosts(response)
      } else {
        setError('Failed to load posts')
      }
    } catch (err) {
      setError('Connection error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await apiRequest(`${API_ENDPOINTS.ADMIN_POSTS}/${id}`, {
          method: 'DELETE',
        })
        if (response) {
          fetchPosts() // Refresh the list
        } else {
          setError('Failed to delete post')
        }
      } catch (err) {
        setError('Connection error: ' + err.message)
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="admin-loading">Loading posts...</div>
  }

  return (
    <div className="post-manager-container">
      <div className="post-manager-header">
        <h1>Manage Posts</h1>
        <div className="post-manager-actions">
          <Link to="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
          <Link to="/admin/posts/edit/new" className="create-post-button">Create New Post</Link>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="posts-table">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. <Link to="/admin/posts/edit/new">Create your first post</Link></p>
          </div>
        ) : (
          <table>
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
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <div className="post-title">{post.title}</div>
                    <div className="post-excerpt">{post.excerpt}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{formatDate(post.created_at)}</td>
                  <td>{formatDate(post.updated_at)}</td>
                  <td>
                    <div className="post-actions">
                      <Link to={`/admin/posts/edit/${post.id}`} className="edit-button">Edit</Link>
                      <Link to={`/blog/${post.slug}`} className="view-button" target="_blank">View</Link>
                      <button 
                        onClick={() => deletePost(post.id)} 
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default PostManager
