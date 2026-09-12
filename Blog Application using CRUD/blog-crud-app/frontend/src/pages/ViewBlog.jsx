import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, User } from 'lucide-react';
import { getBlogById, deleteBlog } from '../services/blogApi';
import { useToast } from '../components/ToastContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import BlogModal from '../components/BlogModal';
import './ViewBlog.css';

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBlog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBlogById(id);
      setBlog(data);
    } catch (err) {
      setError("Unable to load the blog. It may have been deleted or doesn't exist.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      addToast('Blog deleted successfully');
      navigate('/');
    } catch (err) {
      addToast('Failed to delete blog', 'error');
      setIsModalOpen(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null; // Not a valid YouTube URL to embed
  };

  if (isLoading) return <Loading text="Loading story..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchBlog} />;
  if (!blog) return <ErrorMessage message="Blog not found." />;

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const embedUrl = getEmbedUrl(blog.videoUrl);

  return (
    <article className="view-blog-page">
      <div className="view-header-actions">
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="action-group">
          <Link to={`/edit/${blog.id}`} className="btn btn-outline">
            <Edit size={18} /> Edit
          </Link>
          <button className="btn btn-danger" onClick={() => setIsModalOpen(true)}>
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <header className="blog-header">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta">
          <div className="meta-item">
            <User size={18} className="meta-icon" />
            <span className="meta-text">{blog.author}</span>
          </div>
          <div className="meta-item">
            <Calendar size={18} className="meta-icon" />
            <span className="meta-text">{formattedDate}</span>
          </div>
        </div>
      </header>

      {blog.imageUrl && (
        <div className="blog-cover-image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
      )}

      <div className="blog-content">
        {blog.content.split('\n').map((paragraph, index) => (
          paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>

      {embedUrl && (
        <div className="blog-video-container">
          <h3 className="video-title">Related Video</h3>
          <div className="video-responsive">
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </article>
  );
};

export default ViewBlog;
