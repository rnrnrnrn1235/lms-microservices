import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 التعامل مع تسجيل الدخول
  const handleLogin = (event) => {
    event.preventDefault();

    // جلب المستخدمين من LocalStorage
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      localStorage.removeItem("users");
      users = [];
    }

    // التحقق من وجود Admin ثابت إذا لم يكن موجود
    if (!users.some(u => u.email === "admin@gmail.com")) {
      users.push({
        id: Date.now(),
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        status: "Active"
      });
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Admin account initialized!");
    }

    // البحث عن المستخدم
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    // حفظ المستخدم الحالي في LocalStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    // إعادة التوجيه حسب الدور
    if (user.role === "admin") navigate("/admin/dashboard");
    else if (user.role === "librarian") navigate("/librarian/dashboard");
    else navigate("/member/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>مرحبًا بعودتك</h1>
          <p>سجّل دخولك للاستمرار إلى لوحة التحكم الخاصة بك</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            تسجيل الدخول
          </button>
        </form>
        <div className="register-link">
          <p>
            ليس لديك حساب؟ <Link to="/register">أنشئ حسابًا جديدًا</Link>
          </p>
        </div>
      </div>
    </div>
  );
}




