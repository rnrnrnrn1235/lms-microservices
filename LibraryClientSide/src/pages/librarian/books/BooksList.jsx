import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './BooksList.css';

const defaultBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', category: 'Fiction', status: 'Available', copies: 5, available: 3 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', category: 'Fiction', status: 'Borrowed', copies: 3, available: 0 },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', category: 'Fiction', status: 'Available', copies: 8, available: 5 }
];

const getStoredBooks = () => {
  const stored = localStorage.getItem('books');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse books from storage', error);
    }
  }
  localStorage.setItem('books', JSON.stringify(defaultBooks));
  return defaultBooks;
};

const BooksList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [books, setBooks] = useState(getStoredBooks());
  const [search, setSearch] = useState("");

  useEffect(() => {
    const refreshBooks = () => setBooks(getStoredBooks());

    const handleStorageChange = (event) => {
      if (event.key === 'books') {
        refreshBooks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(refreshBooks, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 🔍 فلترة الكتب حسب البحث
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.isbn.includes(search)
  );

  return (
    <div className={`books-list-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
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
          <h1>📚 Books List</h1>
        </header>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 ابحث عن كتاب بالعنوان أو الكاتب أو ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="books-container">
          <div className="table-wrapper">
            <table className="books-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Status</th>
                  <th>Copies</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>
                      <span className={`status-badge ${book.status?.toLowerCase() || 'available'}`}>
                        {book.status}
                      </span>
                    </td>
                    <td>{book.copies}</td>
                    <td>{book.available ?? '-'}</td>
                  </tr>
                ))}

                {filteredBooks.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                      لا توجد نتائج مطابقة للبحث.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BooksList;









