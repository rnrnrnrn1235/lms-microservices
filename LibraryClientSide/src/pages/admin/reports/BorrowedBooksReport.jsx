// BorrowedBooksReport.js
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './BorrowedBooksReport.css';

const BorrowedBooksReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');
  const getBorrowedBooks = () => borrows.filter(b => {
    const status = b.status === 'active' ? 'Active' : b.status;
    return status === 'Active';
  });
  const borrowedBooks = getBorrowedBooks();

  return (
    <div className={`report-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <div className="page-main-content">
        <header className="page-header">
          <button className="menu-toggle" type="button" onClick={() => setSidebarOpen(prev => !prev)}>☰</button>
          <h1>📊 Borrowed Books Report</h1>
          <button className="export-btn" type="button">📥 Export PDF</button>
        </header>

        <div className="report-container">
          <div className="report-summary">
            <div className="summary-card">
              <h3>Total Borrowed</h3>
              <p className="summary-value">{borrowedBooks.length}</p>
            </div>
          </div>

          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Title</th>
                  <th>Member Name</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map(book => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.bookTitle}</td>
                    <td>{book.memberName}</td>
                    <td>{book.borrowDate}</td>
                    <td>{book.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooksReport;


