import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './blog.css'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="blog-container">
        <Navbar />
        <div className="blog-content">
          <div className="blog-loading">Loading blog posts...</div>
        </div>
        <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="blog-container">
        <Navbar />
        <div className="blog-content">
          <div className="blog-error">Error loading blog posts: {error}</div>
        </div>
        <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
      </div>
    )
  }

  return (
    <div className="blog-container">
      <Helmet>
        <title>Blog - Andrew J. Hermann</title>
        <meta 
          name="description" 
          content="Read Andrew J. Hermann's insights on strategic leadership, AI innovation, and digital transformation in public administration." 
        />
        <meta name="keywords" content="Andrew Hermann blog, strategic leadership, AI innovation, digital transformation, public administration" />
        <meta name="author" content="Andrew J. Hermann" />
        
        <meta property="og:title" content="Blog - Andrew J. Hermann" />
        <meta property="og:description" content="Read Andrew J. Hermann's insights on strategic leadership, AI innovation, and digital transformation in public administration." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://andrew.cloudhopper.ch/blog" />
        <meta property="og:site_name" content="Andrew J. Hermann" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Andrew J. Hermann" />
        <meta name="twitter:description" content="Read Andrew J. Hermann's insights on strategic leadership, AI innovation, and digital transformation in public administration." />
        
        <link rel="canonical" href="https://andrew.cloudhopper.ch/blog" />
      </Helmet>
      
      <Navbar />
      
      <div className="blog-content">
        <div className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Insights on strategic leadership, AI innovation, and digital transformation in public administration.
          </p>
        </div>
        
        <div className="blog-main">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <h2>No blog posts yet</h2>
              <p>Check back soon for insights and updates.</p>
            </div>
          ) : (
            <div className="blog-posts">
              {posts.map(post => (
                <article key={post.id} className="blog-post-card">
                  <div className="blog-post-header">
                    <h2 className="blog-post-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className="blog-post-meta">
                      <time dateTime={post.created_at}>
                        {formatDate(post.created_at)}
                      </time>
                    </div>
                  </div>
                  <div className="blog-post-excerpt">
                    <p>{post.excerpt}</p>
                  </div>
                  <div className="blog-post-footer">
                    <Link to={`/blog/${post.slug}`} className="blog-read-more">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
    </div>
  )
}

export default Blog
