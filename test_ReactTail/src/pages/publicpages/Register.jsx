import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import logo from '../../assets/img/temp.png';
import { register } from '../../services/authServices';
import Header from '../../components/Header';
export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = data;

    try {
      const res = await register(userName, email, password, confirmPassword);
      if (res.error) {
        toast.error(res.error);
      } else {
        setData({
          userName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        toast.success("Đăng ký thành công! Mời bạn đăng nhập.");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại!");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <form
          onSubmit={registerUser}
          className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Đăng ký tài khoản</h2>
          </div>

          <div>
            <label htmlFor="userName" className="block mb-1">Tên người dùng</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Nhập tên người dùng..."
              value={data.userName}
              onChange={(e) => setData({ ...data, userName: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Xác nhận lại mật khẩu..."
              value={data.confirmPassword}
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Đăng ký
          </button>

          <p className="text-center text-sm mt-6 text-gray-300">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
