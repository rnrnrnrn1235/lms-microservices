import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import './BooksList.css';

const BooksList = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getBooks = () => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) return JSON.parse(storedBooks);
    return [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', category: 'Fiction', status: 'Available', copies: 5, available: 3 },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', category: 'Fiction', status: 'Borrowed', copies: 3, available: 0 },
      { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', category: 'Fiction', status: 'Available', copies: 8, available: 5 },
      { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', category: 'Literature', status: 'Available', copies: 4, available: 2 }
    ];
  };

  const [books, setBooks] = useState(getBooks());

  useEffect(() => {
    const refreshBooks = () => setBooks(getBooks());
    refreshBooks();
    const handleStorageChange = () => refreshBooks();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(refreshBooks, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [location]);

  const handleDelete = (bookId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكتاب؟')) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      alert('تم حذف الكتاب بنجاح');
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`books-list-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      <div className="page-main-content">
        <header className="page-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(prev => !prev)}>☰</button>
          <h1>📚 Books Management</h1>
          <Link to="/admin/books/add" className="add-button">+ Add New Book</Link>
        </header>

        <div className="books-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="no-results">لم يتم العثور على كتب مطابقة للبحث</div>
          ) : (
            <div className="table-wrapper">
              <table className="books-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Copies</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map(book => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.category || 'N/A'}</td>
                      <td><span className={`status-badge ${book.status.toLowerCase()}`}>{book.status}</span></td>
                      <td>{book.copies}</td>
                      <td>{book.available || 0}</td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/admin/books/edit/${book.id}`} className="edit-btn">✏️ Edit</Link>
                          <button onClick={() => handleDelete(book.id)} className="delete-btn">🗑️ Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksList;


