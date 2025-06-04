import { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getMoviesByCategory,
} from "../../services/categoryServices";
import AdminHeader from "../../components/AdminHeader";

export default function ManagerCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data.data);
  };

  const loadMoviesByCategory = async () => {
    if (!search.trim()) return;
    try {
      const res = await getMoviesByCategory(search);
      setMovies(res.data.data);
    } catch {
      alert("Lỗi khi tìm kiếm phim");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Tên category không được để trống");
      return;
    }
    try {
      if (editId) {
        await updateCategory(editId, { name, description });
      } else {
        await createCategory({ name, description });
      }
      setName("");
      setDescription("");
      setEditId(null);
      loadCategories();
    } catch {
      alert("Lỗi khi lưu category");
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa category này?")) {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch {
        alert("Lỗi khi xóa category");
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadMoviesByCategory();
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-6">Quản lý thể loai</h2>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col md:flex-row gap-4 items-start"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên category"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full md:w-1/3 focus:ring focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold"
          >
            {editId ? "Cập nhật" : "Thêm"}
          </button>
        </form>

        <form
          onSubmit={handleSearchSubmit}
          className="mb-8 flex gap-4 items-center"
        >
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
          >
            Tìm kiếm
          </button>
        </form>

        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4">Tên category</th>
                <th className="p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center p-4 text-gray-300">
                    Chưa có category nào
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id} className="border-t border-gray-600">
                    <td className="p-4">{cat.name}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white"
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {movies.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">
              Phim thuộc thể loại "{search}":
            </h3>
            <ul className="list-disc pl-6 text-gray-300">
              {movies.map((movie) => (
                <li key={movie._id}>{movie.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
