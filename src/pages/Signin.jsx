import React, { useState } from "react";
import axios from "../axiosInstance";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style/signin/signin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/icons/favicon.ico";
import bg_img from "../assets/images/bg_img.jpg";
import TextPressure from "../components/animation/txt";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);

  const visible = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
    >
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
    </svg>
  );
  const hidden = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
    >
      <path d="M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  );
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.password) {
      return toast.error("يرجى ملء جميع الحقول");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/user/signin",
        // "http://localhost:5005/user/signin",
        {
          username: formData.name,
          password: formData.password,
        }
      );
      if (response.data.success) {
        toast.success("تم تسجيل الدخول بنجاح");
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message || "فشل تسجيل الدخول");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="signin-pages"
      dir="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div className="image">
        <img src={bg_img} alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="txt">
          <h2>شارك للاستشارات</h2>

          <p>
            شركة شارِك للإستشارات تقدم خدمات دراسات الجدوى والاستشارات الإدارية
            للمشاريع في قطر والسعودية والإمارات وعمان منذ عام 2010، بخبرة تتجاوز
            13 عامًا وأكثر من 1150 دراسة جدوى ناجحة.
          </p>
        </div>
        <div className="bottom">
          <p>شركة شارِك للاستشارات جهة موثوقة بخبرة تزيد عن 13 عامًا</p>
        </div>
      </div>
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <div className="top">
            <h1>تسجيل الدخول</h1>
          </div>
          <label htmlFor="name">
            <p>اسم المستخدم</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              placeholder=" "
              dir="auto"
            />
          </label>

          <label htmlFor="password">
            <p>كلمة السر</p>
            <div className="pass">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                placeholder=" "
                dir="auto"
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? hidden : visible}
              </button>
            </div>
          </label>

          <label htmlFor="submit">
            <button type="submit" name="submit" disabled={loading}>
              {loading ? "جاري الإرسال..." : "ارسال"}
            </button>
          </label>
        </form>
        <div className="bottom">
          <div className="txt" dir="ltr">
            <TextPressure
              text="shark-plan.com"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              textColor="#000"
              strokeColor="#ff0000"
              minFontSize={36}
            />
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 10000 }}
      />
    </motion.div>
  );
}
