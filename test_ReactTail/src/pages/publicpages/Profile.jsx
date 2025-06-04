import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../../components/Header";

export default function ProFile() {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put("/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Cập nhật thành công");
      setUser(data.user);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Thông tin cá nhân</h1>

          {!isEditing ? (
            <>
              <div className="space-y-4">
                <h2 className="text-xl"><span className="font-semibold">Tên:</span> {user?.userName}</h2>
                <h2 className="text-xl"><span className="font-semibold">Email:</span> {user?.email}</h2>
                <h2 className="text-xl"><span className="font-semibold">Quyền:</span> {user?.role}</h2>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Chỉnh sửa
              </button>
            </>
          ) : (
            <form
              onSubmit={handleUpdate}
              className="flex flex-col gap-4 mt-4"
            >
              <input
                type="text"
                name="userName"
                placeholder="Tên"
                value={formData.userName}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu mới (nếu muốn)"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
