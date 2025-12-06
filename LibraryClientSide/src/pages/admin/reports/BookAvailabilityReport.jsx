import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './BookAvailabilityReport.css';

const BookAvailabilityReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getBooks = () => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      const books = JSON.parse(storedBooks);
      return books.map(book => ({
        id: book.id,
        title: book.title,
        totalCopies: book.copies || 0,
        available: book.available || 0,
        borrowed: (book.copies || 0) - (book.available || 0)
      }));
    }
    return [];
  };
  
  const books = getBooks();

  return (
    <div className={`report-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      <div className="page-main-content">
        <header className="page-header">
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            ☰
          </button>
          <h1>📚 Book Availability Report</h1>
          <button className="export-btn" type="button">📥 Export PDF</button>
        </header>

        <div className="report-container">
          <div className="report-summary">
            <div className="summary-card">
              <h3>Total Books</h3>
              <p className="summary-value">{books.length}</p>
            </div>
          </div>

          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Title</th>
                  <th>Total Copies</th>
                  <th>Available</th>
                  <th>Borrowed</th>
                  <th>Availability Rate</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => {
                  const availabilityRate = book.totalCopies
                    ? ((book.available / book.totalCopies) * 100).toFixed(0)
                    : 0;
                  return (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.totalCopies}</td>
                      <td><span className="available-badge">{book.available}</span></td>
                      <td><span className="borrowed-badge">{book.borrowed}</span></td>
                      <td>
                        <div className="availability-bar">
                          <div 
                            className="availability-fill" 
                            style={{ width: `${availabilityRate}%` }}
                          ></div>
                          <span className="availability-text">{availabilityRate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAvailabilityReport;
