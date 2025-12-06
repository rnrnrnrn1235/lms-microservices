import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import "./UsersList.css";

const UsersList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const getUsers = () => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) return JSON.parse(storedUsers);
    return [
      { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", role: "Member", status: "Active" },
      { id: 2, name: "Sara Mohamed", email: "sara@example.com", role: "Librarian", status: "Active" },
      { id: 3, name: "Omar Hassan", email: "omar@example.com", role: "Member", status: "Inactive" },
      { id: 4, name: "Fatima Ibrahim", email: "fatima@example.com", role: "Member", status: "Active" },
    ];
  };

  const [users, setUsers] = useState(getUsers());

  useEffect(() => {
    const refreshUsers = () => setUsers(getUsers());
    refreshUsers();
    const handleStorageChange = () => refreshUsers();
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(refreshUsers, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [location]);

  const handleDelete = (userId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("تم حذف المستخدم بنجاح");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`users-list-page ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="page-main-content">
        <header className="page-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1>👥 Users Management</h1>
          <Link to="/admin/users/add" className="add-button">
            + Add New User
          </Link>
        </header>

        <div className="users-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* ===== إذا لم توجد نتائج ===== */}
          {filteredUsers.length === 0 ? (
            <div className="no-results">لم يتم العثور على المستخدمين</div>
          ) : (
            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className="role-badge">{user.role}</span></td>
                      <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/admin/users/edit/${user.id}`} className="edit-btn">✏️ Edit</Link>
                          <button onClick={() => handleDelete(user.id)} className="delete-btn">🗑️ Delete</button>
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

export default UsersList;


