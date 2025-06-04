import { useEffect, useState, useContext } from "react";
import {
  getAllMovies,
  searchMovies
} from "../../services/moviesServices";
import { addFavorite } from "../../services/favoriteServices";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState(new Set());
  const [error, setError] = useState("");
  const [loadingFavs, setLoadingFavs] = useState(new Set());
  const [selectedMovie, setSelectedMovie] = useState(null); // State cho popup
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const { user } = useContext(UserContext);

  const fetchMovies = async () => {
    setError("");
    try {
      let res;
      if (query) {
        res = await searchMovies(query);
      } else {
        res = await getAllMovies();
      }
      setMovies(res.data.data);

      if (user?._id) {
        const favoriteRes = await fetch(`/api/favorites/user/${user._id}`);
        const favoriteData = await favoriteRes.json();
        const favIds = new Set(favoriteData.data.map((m) => m._id));
        setFavoritesIds(favIds);
      } else {
        setFavoritesIds(new Set());
      }
    } catch (err) {
      console.error("Lỗi khi tải phim:", err);
      setError("Không tìm thấy danh sách phim phù hợp.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query, user]);

  const handleAddFavorite = async (movieId) => {
    if (!user) {
      alert("Bạn cần đăng nhập để thích phim");
      return;
    }
    if (loadingFavs.has(movieId)) {
      return;
    }
    try {
      setLoadingFavs(new Set(loadingFavs).add(movieId));
      await addFavorite(user._id, movieId);
      setFavoritesIds(new Set(favoritesIds).add(movieId));
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm phim yêu thích");
    } finally {
      const newLoading = new Set(loadingFavs);
      newLoading.delete(movieId);
      setLoadingFavs(newLoading);
    }
  };

  return (
    <>
      <Header />
      <Banner />
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-fuchsia-800 text-white px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400 uppercase tracking-wider">
          Danh sách phim
        </h2>

        {error && (
          <p className="text-center text-red-400 mb-6">{error}</p>
        )}

        {movies.length === 0 && !error ? (
          <p className="text-center text-gray-300">Không tìm thấy phim nào phù hợp.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="relative group rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-purple-700 to-pink-600 hover:shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover transition duration-300 group-hover:brightness-50"
                />

                <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition duration-300 p-4 bg-black bg-opacity-70">
                  <div>
                    <h3 className="text-lg font-bold">{movie.title}</h3>
                    {movie.englishTitle && (
                      <p className="text-sm text-yellow-300 italic">{movie.englishTitle}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/comment/${movie._id}`)}
                      className="flex items-center justify-center gap-2 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-full text-sm shadow"
                    >
                      <FaPlay /> Xem ngay
                    </button>
                    <button
                      onClick={() => setSelectedMovie(movie)} // mở popup chi tiết
                      className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full text-sm"
                    >
                      <FaInfoCircle /> Chi tiết
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3 text-xs text-white font-semibold">
                    {movie.rating && (
                      <span className="bg-yellow-500 text-black px-2 py-0.5 rounded">IMDb {movie.rating}</span>
                    )}
                    {movie.age && (
                      <span className="bg-white text-black px-2 py-0.5 rounded">T{movie.age}</span>
                    )}
                    {movie.year && <span>{movie.year}</span>}
                    {movie.season && <span>Phần {movie.season}</span>}
                    {movie.episode && <span>Tập {movie.episode}</span>}
                  </div>

                  <div className="text-xs text-white/80 mt-1">
                    {(movie.category && movie.category.length > 0)
                      ? movie.category.map((cat) => cat.name).join(" · ")
                      : "Thể loại chưa rõ"}
                  </div>
                </div>

                <div className="p-2 group-hover:hidden">
                  <h3 className="text-sm font-semibold truncate text-center">{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popup chi tiết phim */}
        {selectedMovie && (
          <div
            className="fixed inset-0 bg-transparent flex justify-center items-center z-50"
            onClick={() => setSelectedMovie(null)}
          >
            <div
              className="bg-gray-900 p-6 rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
                onClick={() => setSelectedMovie(null)}
                aria-label="Close popup"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
              {selectedMovie.englishTitle && (
                <p className="italic text-yellow-300 mb-2">{selectedMovie.englishTitle}</p>
              )}
              <img
                src={selectedMovie.imageUrl}
                alt={selectedMovie.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <p><strong>Mô tả:</strong> {selectedMovie.description}</p>
              <p><strong>Ngày phát hành:</strong> {new Date(selectedMovie.releaseDate).toLocaleDateString()}</p>
              <p><strong>Thể loại:</strong> {selectedMovie.category?.map(c => c.name).join(", ") || "Không rõ"}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
