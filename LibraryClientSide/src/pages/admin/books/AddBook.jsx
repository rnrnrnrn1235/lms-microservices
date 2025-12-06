import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import './AddBook.css';

const AddBook = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Fiction',
    copies: 1,
    available: 1,
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Number(formData.available) > Number(formData.copies)) {
      alert('النسخ المتاحة لا يمكن أن تكون أكثر من إجمالي النسخ');
      return;
    }
    
    const newBook = {
      id: Date.now(),
      ...formData,
      status: formData.available > 0 ? 'Available' : 'Unavailable'
    };
    
    const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');
    existingBooks.push(newBook);
    localStorage.setItem('books', JSON.stringify(existingBooks));
    
    alert('تم إضافة الكتاب بنجاح!');
    navigate('/admin/books');
  };

  return (
    <div className={`add-book-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="page-main-content">
        <header className="page-header">
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>
          <h1>➕ Add New Book</h1>
          <button
            onClick={() => navigate('/admin/books')}
            className="back-button"
            type="button"
          >
            ← Back to Books
          </button>
        </header>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="book-form">
            <div className="form-group">
              <label htmlFor="title">Book Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Technology">Technology</option>
                <option value="Literature">Literature</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="copies">Total Copies</label>
                <input
                  type="number"
                  id="copies"
                  name="copies"
                  value={formData.copies}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="available">Available Copies</label>
                <input
                  type="number"
                  id="available"
                  name="available"
                  value={formData.available}
                  onChange={handleChange}
                  min="0"
                  max={formData.copies}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter book description"
                rows="5"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/admin/books')}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

