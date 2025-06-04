import { useEffect, useState } from "react";
import {
  getAllMovies,
  deleteMovie,
} from "../../services/moviesServices";
import MovieForm from "./movieForm";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ thêm state tìm kiếm

  const fetchMovies = async () => {
    try {
      const res = await getAllMovies();
      setMovies(res.data.data);
    } catch (err) {
      alert("Không tìm thấy danh sách phim");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmDelete) return;

    try {
      await deleteMovie(id);
      alert("Đã xóa thành công!");
      fetchMovies();
    } catch (err) {
      alert("Lỗi khi xóa!");
      console.error(err);
    }
  };

  const handleSuccess = () => {
    setEditingMovie(null);
    setShowForm(false);
    fetchMovies();
  };

  // Lọc phim theo từ khóa tìm kiếm (so sánh không phân biệt hoa thường)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-6">Quản lý phim</h1>
        <div className="bg-gray-800 p-6 text-black rounded-xl shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {editingMovie ? " Chỉnh sửa phim" : " Thêm phim mới"}
            </h2>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition ${editingMovie || showForm
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
              onClick={() => {
                if (editingMovie) {
                  setEditingMovie(null);
                } else {
                  setShowForm((prev) => !prev);
                }
              }}
            >
              {editingMovie ? "Hủy chỉnh sửa" : showForm ? "Đóng" : "Thêm phim"}
            </button>
          </div>

          {(showForm || editingMovie) && (
            <div className="border-t border-gray-700 pt-4">
              <MovieForm initialData={editingMovie} onSuccess={handleSuccess} />
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Tìm kiếm phim theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full table-auto bg-gray-800">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Ảnh</th>
                <th className="px-4 py-2 text-left">Tên phim</th>
                <th className="px-4 py-2 text-left">Mô tả</th>
                <th className="px-4 py-2 text-left">Thể loại</th>
                <th className="px-4 py-2 text-left">Ngày phát hành</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-300">
                    Không có phim nào
                  </td>
                </tr>
              ) : (
                filteredMovies.map((movie) => (
                  <tr
                    key={movie._id}
                    className="border-t border-gray-700 hover:bg-gray-700/30"
                  >
                    <td className="px-4 py-2">
                      <Link to={`/commentadmin/${movie._id}`}>
                        <img
                          src={movie.imageUrl}
                          alt={movie.title}
                          className="w-20 h-28 object-cover rounded"
                        />
                      </Link>
                    </td>
                    <td className="px-4 py-2 font-semibold">{movie.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-300 max-w-xs truncate">
                      {movie.description}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {movie.category?.length > 0
                        ? movie.category.map((c) => c.name).join(", ")
                        : "Không rõ"}
                    </td>
                    <td className="px-4 py-2 text-sm">{movie.releaseDate}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg"
                        onClick={() => {
                          setEditingMovie(movie);
                          setShowForm(false);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                        onClick={() => handleDelete(movie._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MovieList;
