import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllMovies } from "../../services/moviesServices";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      try {
        const res = await getAllMovies();
        const filtered = res.data.data.filter((movie) =>
          movie.category.some((c) => c._id === id)
        );
        setMovies(filtered);
      } catch (error) {
        console.error("Lỗi khi tải phim theo thể loại:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesByCategory();
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-fuchsia-800 text-white p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Phim </h2>
        {loading ? (
          <p>Đang tải phim...</p>
        ) : movies.length === 0 ? (
          <p>Không có phim nào trong thể loại này.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <Link
                key={movie._id}
                to={`/comment/${movie._id}`}
                className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-lg text-white">{movie.title}</h3>
                <p className="text-gray-300 mt-2 line-clamp-3">{movie.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
