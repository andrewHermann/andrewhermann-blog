import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SEO from '../components/seo'
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
      const response = await fetch('http://localhost:5000/api/posts/published')
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Strategic Leadership & AI Innovation Blog",
    "description": "Insights and articles about strategic leadership, AI innovation, and organizational transformation by Andrew J. Hermann",
    "url": "https://***REMOVED***/blog",
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
      "url": `https://***REMOVED***/blog/${post.slug}`,
      "datePublished": post.published_at,
      "author": {
        "@type": "Person",
        "name": "Andrew J. Hermann"
      }
    }))
  }

  const blogBreadcrumbs = [
    { name: "Home", url: "https://***REMOVED***" },
    { name: "Blog", url: "https://***REMOVED***/blog" }
  ]

  return (
    <div className="blog-container">
      <SEO
        title="Blog"
        description="Read insights and articles about strategic leadership, AI innovation, organizational transformation, and digital strategy by Andrew J. Hermann. Expert perspectives on modern business challenges."
        keywords="blog, articles, strategic leadership, AI innovation, organizational transformation, digital strategy, business insights, leadership thoughts"
        url="https://***REMOVED***/blog"
        structuredData={blogStructuredData}
        breadcrumbs={blogBreadcrumbs}
      />
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
            {posts.map((post) => (
              <article key={post.id} className="blog-post">
                <div className="blog-post-content">
                  <div className="blog-post-meta">
                    <time dateTime={post.published_at}>
                      {formatDate(post.published_at)}
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
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Blog
