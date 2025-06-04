import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../../services/userServices";
import AdminHeader from "../../components/AdminHeader";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    userName: "",
    email: "",
    role: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // state tìm kiếm

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    if (confirm("Bạn có chắc chắn muốn xoá?")) {
      await deleteUser(email);
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditData({
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateUserRole(editingId, editData);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      alert("Lỗi khi cập nhật: " + err.response?.data?.message);
    }
  };


  const filteredUsers = users.filter((u) =>
    u.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-6"> Quản lý người dùng</h2>

        <input
          type="text"
          placeholder="Tìm kiếm tên người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 w-full max-w-sm rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Tên</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Vai trò</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-400">
                    Không tìm thấy người dùng phù hợp.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t border-gray-700 hover:bg-gray-700/30"
                  >
                    <td className="px-4 py-2">
                      {editingId === u._id ? (
                        <input
                          value={editData.userName}
                          onChange={(e) =>
                            setEditData({ ...editData, userName: e.target.value })
                          }
                          className="w-full px-2 py-1 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                      ) : (
                        u.userName
                      )}
                    </td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">
                      {editingId === u._id ? (
                        <select
                          value={editData.role}
                          onChange={(e) =>
                            setEditData({ ...editData, role: e.target.value })
                          }
                          className="w-full px-2 py-1 rounded bg-gray-600 text-white focus:outline-none"
                        >
                          <option value="admin">Admin</option>
                          <option value="member">Member</option>
                        </select>
                      ) : (
                        u.role
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      {editingId === u._id ? (
                        <>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                            onClick={handleUpdate}
                          >
                            Lưu
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                            onClick={() => setEditingId(null)}
                          >
                            Huỷ
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            onClick={() => handleDelete(u.email)}
                          >
                            Xoá
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            onClick={() => handleEdit(u)}
                          >
                            Sửa
                          </button>
                        </>
                      )}
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

export default UserManager;
