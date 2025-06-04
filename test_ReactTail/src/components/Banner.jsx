import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconRating from "../assets/img/star.png";
import IconRatingHalf from "../assets/img/half_star.png";
import IconPlay from "../assets/img/IconPlay.png";
import { getAllMovies } from "../services/moviesServices";

const Banner = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const navigate = useNavigate();

  const fetchRandomMovie = async () => {
    try {
      const res = await getAllMovies();
      const movies = res.data.data;
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      }
    } catch (err) {
      console.error("Không thể lấy dữ liệu phim", err);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (!randomMovie) return null;

  return (
    <div className='w-full h-[400px] relative bg-black text-white'>
      <div className='absolute w-full h-full bg-black opacity-50 z-10' />
      <div className='relative z-20 flex items-center justify-between h-full px-8'>
        <div className='w-full md:w-1/2 space-y-4'>
          <h2 className='text-3xl font-bold'>{randomMovie.title}</h2>

          <div className='flex items-center space-x-2'>
            <img src={IconRating} alt="star" className="w-6 h-6" />
            <img src={IconRating} alt="star" className="w-6 h-6" />
            <img src={IconRating} alt="star" className="w-6 h-6" />
            <img src={IconRating} alt="star" className="w-6 h-6" />
            <img src={IconRatingHalf} alt="half-star" className="w-6 h-6" />
          </div>

          <p className='text-sm text-gray-200 line-clamp-3'>{randomMovie.description}</p>

          <div className='flex space-x-4'>
            <button
              onClick={() => navigate(`/comment/${randomMovie._id}`)}
              className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-full font-semibold shadow transition"
            >
              Xem phim
            </button>
            <button
              onClick={() => alert("Thông tin chi tiết")}
              className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold shadow transition"
            >
              Chi tiết
            </button>
          </div>
        </div>

        <div className='hidden md:block w-1/2'>
          <div className="relative w-[300px] h-[200px] mx-auto group">
            <img
              src={randomMovie.imageUrl}
              alt="Banner movie"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition duration-300">
              <img src={IconPlay} alt="play" className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;