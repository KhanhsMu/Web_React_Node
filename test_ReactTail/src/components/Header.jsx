import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAllCategories } from '../services/categoryServices';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data.data || []);
            } catch (error) {
                console.error("Lỗi khi tải thể loại:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCategoryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/movielist?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleCategoryClick = (catId) => {
        setShowCategoryDropdown(false);
        navigate(`/category/${catId}`);
    };

    return (
        <>
            <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white p-6 flex justify-between items-center shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-6">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
                        MovieFlix
                    </h1>

                    <nav className="flex space-x-8 relative">
                        <Link to="/movieList" className="nav-link">Trang Chủ</Link>
                        <Link to="/favorite" className="nav-link">Yêu Thích</Link>

                        <div className="relative cursor-pointer nav-link" ref={dropdownRef}>
                            <span
                                className="flex items-center gap-1 select-none"
                                onClick={() => setShowCategoryDropdown(prev => !prev)}
                            >
                                Thể Loại
                                <svg
                                    className="w-4 h-4 inline-block"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>

                            {showCategoryDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-100 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50 max-h-72 overflow-y-auto grid grid-cols-3 gap-3">
                                    {categories.length === 0 ? (
                                        <p className="text-center text-gray-400">Đang tải thể loại...</p>
                                    ) : (
                                        categories.map((cat) => (
                                            <button
                                                key={cat._id}
                                                onClick={() => handleCategoryClick(cat._id)}
                                                className="block w-full text-left px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-200 focus:outline-none focus:bg-purple-700"
                                            >
                                                {cat.name}
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800/50 backdrop-blur-sm text-white rounded-full px-5 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 placeholder-gray-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-red-500 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-full shadow-md transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full shadow-md transition duration-300"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {user?.role === "admin" && (
                                <Link
                                    to="/adminpage"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-3 rounded-full shadow-md transition duration-300"
                                >
                                    Dashboard
                                </Link>
                            )}
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
