import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Global styles for main sections
import './components/Sidebar.css';
import './components/Layout.css';
// Admin styles
import './pages/admin/AdminDashboard.css';
import './pages/admin/users/UsersList.css';
import './pages/admin/users/AddUser.css';
import './pages/admin/users/EditUser.css';
import './pages/admin/books/BooksList.css';
import './pages/admin/books/AddBook.css';
import './pages/admin/books/EditBook.css';
import './pages/admin/reports/BorrowedBooksReport.css';
import './pages/admin/reports/OverdueBooksReport.css';
import './pages/admin/reports/FinesReport.css';
import './pages/admin/reports/BookAvailabilityReport.css';
// Librarian styles
import './pages/librarian/LibrarianDashboard.css';
import './pages/librarian/books/BooksList.css';
import './pages/librarian/books/EditBook.css';
import './pages/librarian/borrow/BorrowList.css';
import './pages/librarian/borrow/IssueBook.css';
import './pages/librarian/borrow/ReturnBook.css';
// Member styles
import './pages/member/MemberDashboard.css';
import './pages/member/SearchBooks.css';
import './pages/member/MyBorrowingHistory.css';
// Auth pages
import './pages/login/Login.css';
import './pages/register/Register.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
