import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import "./EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "member",
    status: "active",
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.id === parseInt(id, 10));
    if (!user) {
      navigate("/admin/users");
      return;
    }

    setFormData({
      ...user,
      password: user.password,
      confirmPassword: user.password,
    });
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u) => u.id === parseInt(id, 10));
    if (index === -1) return;

    if (users.some((u, i) => i !== index && u.email === formData.email)) {
      alert("البريد الإلكتروني مستخدم بالفعل");
      return;
    }

    users[index] = {
      ...users[index],
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("تم تحديث المستخدم بنجاح!");
    navigate("/admin/users");
  };

  return (
    <div className={`edit-user-page ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
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
          <h1>✏️ Edit User #{id}</h1>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/admin/users")}
          >
            ← Back to Users
          </button>
        </header>

        <div className="form-container">
          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+20 123 456 7890"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="member">Member</option>
                  <option value="librarian">Librarian</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/admin/users")}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

