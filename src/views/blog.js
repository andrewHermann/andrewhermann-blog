import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PageFloatingRobot from '../components/PageFloatingRobot'
import SEO from '../components/seo'
import { API_ENDPOINTS, apiRequest } from '../config/api'
import './blog.css'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.POSTS)
        if (response && Array.isArray(response)) {
          // Only show published posts, sorted by creation date
          const publishedPosts = response.filter(post => post.published)
                                         .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setPosts(publishedPosts)
        }
      } catch (err) {
        console.log('Error fetching posts:', err.message)
        setError('Unable to load blog posts at this time.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // SEO structured data for blog
  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Andrew J. Hermann Blog',
    description: 'Insights on strategic leadership, AI innovation, and organizational transformation',
    url: 'https://andrew.cloudhopper.ch/blog',
    author: {
      '@type': 'Person',
      name: 'Andrew J. Hermann',
      url: 'https://andrew.cloudhopper.ch'
    },
    publisher: {
      '@type': 'Person',
      name: 'Andrew J. Hermann'
    }
  }

  // Breadcrumb structured data
  const blogBreadcrumbs = [
    { name: 'Home', url: 'https://andrew.cloudhopper.ch' },
    { name: 'Blog', url: 'https://andrew.cloudhopper.ch/blog' }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Blog"
        description="Read insights and articles about strategic leadership, AI innovation, organizational transformation, and digital strategy by Andrew J. Hermann. Expert perspectives on modern business challenges."
        keywords="blog, articles, strategic leadership, AI innovation, organizational transformation, digital strategy, business insights, leadership thoughts"
        url="https://andrew.cloudhopper.ch/blog"
        structuredData={blogStructuredData}
        breadcrumbs={blogBreadcrumbs}
      />
      
      {/* Floating Robot with green/emerald body color */}
      <PageFloatingRobot bodyColor="#10b981" glowColor="#34d399" />
      
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Blog & Insights</h1>
          <p className="page-subtitle">
            Thoughts and insights on strategic leadership, artificial intelligence, and organizational transformation.
          </p>
        </div>
        
        <div className="content-main">
          {loading ? (
            <div className="blog-loading">
              <p>Loading posts...</p>
            </div>
          ) : error ? (
            <div className="blog-error">
              <p>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty section-card">
              <h2>Articles Coming Soon</h2>
              <p>I'm preparing thoughtful content about strategic leadership, AI innovation, and organizational transformation. Stay tuned for expert insights and practical guidance on modern business challenges.</p>
            </div>
          ) : (
            <div className="blog-posts-grid">
              {posts.map((post) => (
                <article key={post.id} className="section-card blog-post-card">
                  {post.featured_image && (
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="blog-post-image"
                    />
                  )}
                  <div className="blog-post-content">
                    <div className="blog-post-meta">
                      <time dateTime={post.created_at}>
                        {formatDate(post.created_at)}
                      </time>
                      {post.category && (
                        <span className="blog-post-category">{post.category}</span>
                      )}
                    </div>
                    <h2 className="blog-post-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    {post.tags && (
                      <div className="blog-post-tags">
                        {post.tags.split(',').map((tag, index) => (
                          <span key={index} className="blog-post-tag">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="blog-post-footer">
                      <Link to={`/blog/${post.slug}`} className="blog-post-link">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Blog
