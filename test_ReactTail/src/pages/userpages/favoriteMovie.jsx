import { useState, useEffect, useContext } from "react";
import { getFavorite } from "../../services/favoriteServices";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?._id) return;
      try {
        const res = await getFavorite(user._id);
        setFavorites(res.data.data); // danh sách phim yêu thích
      } catch (err) {
        console.error("Lỗi khi tải phim yêu thích:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Phim Yêu Thích</h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            Chưa có phim yêu thích nào.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/comment/${movie._id}`}>
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    {movie.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                    {movie.description}
                  </p>
                  <p className="text-yellow-400 font-medium text-sm">
                    Ngày phát hành: {movie.releaseDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritePage;
