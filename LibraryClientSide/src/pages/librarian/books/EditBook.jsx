import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    copies: 1,
    available: 0,
    description: ''
  });

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const book = books.find((b) => String(b.id) === String(id));

    if (!book) {
      alert('لم يتم العثور على الكتاب');
      navigate('/librarian/books');
      return;
    }

    setFormData({
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      category: book.category || 'Fiction',
      copies: book.copies || 1,
      available: book.available ?? 0,
      description: book.description || ''
    });
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const index = books.findIndex((b) => String(b.id) === String(id));
    if (index === -1) return;

    const copies = Number(formData.copies);
    const available = Math.min(Number(formData.available), copies);

    books[index] = {
      ...books[index],
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      category: formData.category,
      copies,
      available,
      description: formData.description,
      status: available > 0 ? 'Available' : 'Unavailable'
    };

    localStorage.setItem('books', JSON.stringify(books));
    alert('تم تحديث بيانات الكتاب');
    navigate('/librarian/books');
  };

  return (
    <div className={`edit-book-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
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
          <h1>✏️ Edit Book #{id}</h1>
          <button onClick={() => navigate('/librarian/books')} className="back-button" type="button">
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
              <button type="button" onClick={() => navigate('/librarian/books')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;








