import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "member",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      alert("البريد الإلكتروني مستخدم بالفعل");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
      status: "Active",
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-background" />
      <div className="register-card">
        <div className="register-header">
          <div className="library-icon">📚</div>
          <h1>إنشاء حساب جديد</h1>
          <p>املأ البيانات التالية للانضمام إلى منصة المكتبة</p>
        </div>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">الاسم الكامل</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
      <input
              id="email"
        type="email"
              name="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="كلمة المرور"
        required
              value={formData.password}
              onChange={handleChange}
      />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
      <input
              id="confirmPassword"
        type="password"
              name="confirmPassword"
              placeholder="تأكيد كلمة المرور"
        required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">رقم الهاتف (اختياري)</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="+20 123 456 7890"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">اختر الدور</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="member">Member</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
          <button type="submit" className="register-button">
            إنشاء حساب
          </button>
    </form>
        <div className="login-link">
          <p>
            لديك حساب بالفعل؟ <Link to="/login">سجّل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}