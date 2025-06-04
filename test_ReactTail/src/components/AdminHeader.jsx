import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const { data } = await axios.get('/logout');
            localStorage.removeItem("user");
            setUser && setUser(null);
            toast.success(data.message || 'Đăng xuất thành công');
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <>
            <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white p-6 flex justify-between items-center shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-6">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
                        MovieFlix
                    </h1>
                    <nav className="flex space-x-8">
                        <Link
                            to="/managerMovie"
                            className="relative text-lg font-medium hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Quản lí phim
                        </Link>
                        <Link
                            to="/managerUser"
                            className="relative text-lg font-medium hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Quản lí người dùng
                        </Link>
                        <Link
                            to="/managerCategory"
                            className="relative text-lg font-medium hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Quản lí thể Loại
                        </Link>
                        <Link
                            to="/profile"
                            className="relative text-lg font-medium hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Hồ Sơ
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <Link to="/login" className="text-white hover:text-red-400 font-medium">
                                Login
                            </Link>
                            <Link to="/register" className="text-white hover:text-red-400 font-medium">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/movieList"
                                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Trang chủ
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}
