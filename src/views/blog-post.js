import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { API_ENDPOINTS, apiRequest } from '../config/api'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './blog-post.css'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      // Use the correct API endpoint with slug
      const data = await apiRequest(`${API_ENDPOINTS.POSTS}/${slug}`)
      setPost(data)
      setError(null)
    } catch (err) {
      console.log('Error loading post:', err)
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
      <div className="blog-post-container">
        <Helmet>
          <title>Loading Post - Andrew J. Hermann</title>
        </Helmet>
        
        <Navbar />
        
        <div className="blog-post-content">
          <div className="blog-post-header">
            <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
            <h1 className="blog-post-title">Loading...</h1>
          </div>
          
          <div className="blog-post-main">
            <div className="blog-post-loading">Loading post...</div>
          </div>
        </div>
        
        <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <Helmet>
          <title>Post Not Found - Andrew J. Hermann</title>
          <meta name="description" content="The requested blog post could not be found." />
        </Helmet>
        
        <Navbar />
        
        <div className="blog-post-content">
          <div className="blog-post-header">
            <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
            <h1 className="blog-post-title">Post Not Found</h1>
            <p className="blog-post-subtitle">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
          </div>
          
          <div className="blog-post-main">
            <div className="blog-post-error">
              <p>Please check the URL or return to the blog to browse other posts.</p>
            </div>
          </div>
        </div>
        
        <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
      </div>
    )
  }

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{post.title} - Andrew J. Hermann</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content="Andrew Hermann blog, strategic leadership, AI innovation, digital transformation" />
        <meta name="author" content="Andrew J. Hermann" />
        
        <meta property="og:title" content={`${post.title} - Andrew J. Hermann`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://andrew.cloudhopper.ch/blog/${post.slug}`} />
        <meta property="og:site_name" content="Andrew J. Hermann" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - Andrew J. Hermann`} />
        <meta name="twitter:description" content={post.excerpt} />
        
        <link rel="canonical" href={`https://andrew.cloudhopper.ch/blog/${post.slug}`} />
      </Helmet>
      
      <Navbar />
      
      <div className="blog-post-content">
        <div className="blog-post-header">
          <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={post.created_at}>
              Published on {formatDate(post.created_at)}
            </time>
            {post.updated_at !== post.created_at && (
              <span className="blog-post-updated">
                (Updated {formatDate(post.updated_at)})
              </span>
            )}
          </div>
        </div>
        
        <div className="blog-post-main">
          <article className="blog-post-article">
            <div 
              className="blog-post-content-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
      
      <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
    </div>
  )
}

export default BlogPost
