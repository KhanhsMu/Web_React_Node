import React from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/movieList"); // chuyển đến trang movieList
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 bg-opacity-90 rounded-3xl p-12 max-w-2xl text-center shadow-lg">
                {/* Logo */}
                <div className="flex items-center justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-yellow-400 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.59 14.37a6 6 0 11-5.84-9.14"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.59 14.37L13 21l-1.61-3.64"
                        />
                    </svg>
                    <div className="text-white">
                        <h1 className="text-2xl font-bold">RoPhim</h1>
                        <p className="text-sm text-gray-300">Phim hay cả rổ</p>
                    </div>
                </div>

                {/* Text chính */}
                <h2 className="text-white text-2xl font-semibold mb-6">
                    Xem Phim Miễn Phí Cực Nhanh, Chất Lượng Cao <br /> Và Cập Nhật Liên Tục
                </h2>

                {/* Nút Xem Ngay */}
                <button
                    onClick={handleClick}
                    className="bg-yellow-400 hover:bg-yellow-500 transition px-8 py-3 rounded-full font-semibold text-gray-900 shadow-md inline-flex items-center space-x-2 mx-auto"
                >
                    <span>Xem Ngay</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SplashPage;
