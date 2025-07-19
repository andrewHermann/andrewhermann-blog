import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { API_ENDPOINTS, apiRequest } from '../config/api'
import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'
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
      // Use the correct API endpoint - /api/posts already filters for published posts
      const data = await apiRequest(API_ENDPOINTS.POSTS)
      setPosts(data)
      setError(null)
    } catch (err) {
      console.log('Error loading posts:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Strategic Leadership & AI Innovation Blog",
    "description": "Insights and articles about strategic leadership, AI innovation, and organizational transformation by Andrew J. Hermann",
    "url": "https://andrew.cloudhopper.ch/blog",
    "author": {
      "@type": "Person",
      "name": "Andrew J. Hermann"
    },
    "publisher": {
      "@type": "Person",
      "name": "Andrew J. Hermann"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://andrew.cloudhopper.ch/blog/${post.slug}`,
      "datePublished": post.created_at,
      "author": {
        "@type": "Person",
        "name": "Andrew J. Hermann"
      }
    }))
  }

  const blogBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "Blog", url: "https://andrew.cloudhopper.ch/blog" }
  ]

  return (
    <div className="blog-container">
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
      <div className="blog-content">
        <div className="blog-header">
          <h1 className="blog-title">Blog & Insights</h1>
          <p className="blog-subtitle">
            Thoughts and insights on strategic leadership, artificial intelligence, and organizational transformation.
          </p>
        </div>
        
        {loading ? (
          <div className="blog-loading">
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="blog-error">
            <h2>Coming Soon</h2>
            <p>I'm currently working on creating valuable content about strategic leadership, AI innovation, and organizational transformation. Check back soon for insights and perspectives on navigating the modern business landscape.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="blog-empty">
            <h2>Articles Coming Soon</h2>
            <p>I'm preparing thoughtful content about strategic leadership, AI innovation, and organizational transformation. Stay tuned for expert insights and practical guidance on modern business challenges.</p>
          </div>
        ) : (
          <div className="blog-posts">
            <div className="blog-posts-grid">
              {posts.map((post) => (
                <article key={post.id} className="blog-post">
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
                    <div className="blog-post-tags">
                      {post.tags && post.tags.split(',').map((tag, index) => (
                        <span key={index} className="blog-post-tag">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="blog-post-link">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Blog
