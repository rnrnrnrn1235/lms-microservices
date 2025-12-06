import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


// Login & Register
import Login from './pages/login/Login';
import Register from './pages/register/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/users/UsersList';
import AddUser from './pages/admin/users/AddUser';
import EditUser from './pages/admin/users/EditUser';
import BooksList from './pages/admin/books/BooksList';
import AddBook from './pages/admin/books/AddBook';
import EditBook from './pages/admin/books/EditBook';
import BorrowedBooksReport from './pages/admin/reports/BorrowedBooksReport';
import OverdueBooksReport from './pages/admin/reports/OverdueBooksReport';
import FinesReport from './pages/admin/reports/FinesReport';
import BookAvailabilityReport from './pages/admin/reports/BookAvailabilityReport';

// Librarian Pages
import LibrarianDashboard from './pages/librarian/LibrarianDashboard';
import IssueBook from './pages/librarian/borrow/IssueBook';
import ReturnBook from './pages/librarian/borrow/ReturnBook';
import BorrowList from './pages/librarian/borrow/BorrowList';
import LibrarianBooksList from './pages/librarian/books/BooksList';
import LibrarianEditBook from './pages/librarian/books/EditBook';
import LibrarianNotifications from './pages/librarian/borrow/LibrarianNotifications';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';
import SearchBooks from './pages/member/SearchBooks';
import MyBorrowingHistory from './pages/member/MyBorrowingHistory';

// Protected Route
import ProtectedRoute from './utils/ProtectedRoute';

// 🔹 تهيئة Admin ثابت بعد imports
const initAdmin = () => {
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    localStorage.removeItem("users");
    users = [];
  }

  if (!users.some(u => u.email === "admin@gmail.com")) {
    users.push({
      id: Date.now(),
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
      status: "Active",
    });
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Admin account initialized!");
  }
};
initAdmin();

function App() {
  return (
    <Router>
      <Routes>
        {/* Login & Register Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UsersList /></ProtectedRoute>} />
        <Route path="/admin/users/add" element={<ProtectedRoute allowedRoles={['admin']}><AddUser /></ProtectedRoute>} />
        <Route path="/admin/users/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditUser /></ProtectedRoute>} />
        <Route path="/admin/books" element={<ProtectedRoute allowedRoles={['admin']}><BooksList /></ProtectedRoute>} />
        <Route path="/admin/books/add" element={<ProtectedRoute allowedRoles={['admin']}><AddBook /></ProtectedRoute>} />
        <Route path="/admin/books/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditBook /></ProtectedRoute>} />
        <Route path="/admin/reports/borrowed" element={<ProtectedRoute allowedRoles={['admin']}><BorrowedBooksReport /></ProtectedRoute>} />
        <Route path="/admin/reports/overdue" element={<ProtectedRoute allowedRoles={['admin']}><OverdueBooksReport /></ProtectedRoute>} />
        <Route path="/admin/reports/fines" element={<ProtectedRoute allowedRoles={['admin']}><FinesReport /></ProtectedRoute>} />
        <Route path="/admin/reports/availability" element={<ProtectedRoute allowedRoles={['admin']}><BookAvailabilityReport /></ProtectedRoute>} />

        {/* Librarian Routes */}
        <Route path="/librarian/dashboard" element={<ProtectedRoute allowedRoles={['librarian']}><LibrarianDashboard /></ProtectedRoute>} />
        <Route path="/librarian/borrow/issue" element={<ProtectedRoute allowedRoles={['librarian']}><IssueBook /></ProtectedRoute>} />
        <Route path="/librarian/borrow/return" element={<ProtectedRoute allowedRoles={['librarian']}><ReturnBook /></ProtectedRoute>} />
        <Route path="/librarian/borrow/list" element={<ProtectedRoute allowedRoles={['librarian']}><BorrowList /></ProtectedRoute>} />
        <Route path="/librarian/books" element={<ProtectedRoute allowedRoles={['librarian']}><LibrarianBooksList /></ProtectedRoute>} />
        <Route path="/librarian/books/edit/:id" element={<ProtectedRoute allowedRoles={['librarian']}><LibrarianEditBook /></ProtectedRoute>} />
        <Route path="/librarian/notifications" element={<ProtectedRoute allowedRoles={['librarian']}><LibrarianNotifications /></ProtectedRoute>} />

        {/* Member Routes */}
        <Route path="/member/dashboard" element={<ProtectedRoute allowedRoles={['member']}><MemberDashboard /></ProtectedRoute>} />
        <Route path="/member/search" element={<ProtectedRoute allowedRoles={['member']}><SearchBooks /></ProtectedRoute>} />
        <Route path="/member/history" element={<ProtectedRoute allowedRoles={['member']}><MyBorrowingHistory /></ProtectedRoute>} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

