// OverdueBooksReport.js
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './OverdueBooksReport.css';

const OverdueBooksReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');
  const overdueBooks = borrows
    .filter(b => b.status === 'active' || b.status === 'Active')
    .map(borrow => {
      const today = new Date();
      const dueDate = new Date(borrow.dueDate);
      const daysOverdue = Math.max(0, Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)));
      return { ...borrow, daysOverdue };
    })
    .filter(b => b.daysOverdue > 0);

  return (
    <div className={`report-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <div className="page-main-content">
        <header className="page-header">
          <button className="menu-toggle" type="button" onClick={() => setSidebarOpen(prev => !prev)}>☰</button>
          <h1>⚠️ Overdue Books Report</h1>
          <button className="export-btn" type="button">📥 Export PDF</button>
        </header>

        <div className="report-container">
          <div className="report-summary">
            <div className="summary-card warning">
              <h3>Total Overdue</h3>
              <p className="summary-value">{overdueBooks.length}</p>
            </div>
          </div>

          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Title</th>
                  <th>Member Name</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {overdueBooks.map(book => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.bookTitle}</td>
                    <td>{book.memberName}</td>
                    <td>{book.dueDate}</td>
                    <td><span className="overdue-badge">{book.daysOverdue} days</span></td>
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

export default OverdueBooksReport;

