import axios from 'axios';

const API_URL = 'http://localhost:3001/blogs';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBlogs = async () => {
  const response = await api.get('');
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createBlog = async (blog) => {
  // Add a server date to simulate published date if not provided
  const newBlog = {
    ...blog,
    date: new Date().toISOString()
  };
  const response = await api.post('', newBlog);
  return response.data;
};

export const updateBlog = async (id, blog) => {
  // Keep the same date for update if it exists
  const response = await api.put(`/${id}`, blog);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
