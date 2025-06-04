import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { login } from '../../services/authServices';
import logo from '../../assets/img/temp.png';
import { toast } from 'react-hot-toast';
import Header from '../../components/Header';
export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const res = await login(email, password);
      const resData = res.data;

      if (resData.error) {
        toast.error(resData.error);
      } else {
        setUser(resData.user || null);
        setData({ email: '', password: '' });
        toast.success('Đăng nhập thành công');

        if (resData.accessToken) {
          localStorage.setItem('token', resData.accessToken);
        }
        if (resData.user) {
          localStorage.setItem('user', JSON.stringify(resData.user));
        }

        if (resData.user?.role === 'admin') {
          navigate('/adminpage');
        } else {
          navigate('/movieList');
        }
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại: ' + (error.response?.data?.message || error.message));
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <form
          onSubmit={loginUser}
          className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Đăng nhập</h2>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
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
              placeholder="Nhập mật khẩu..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Đăng nhập
          </button>

          <p className="text-center text-sm mt-4">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
