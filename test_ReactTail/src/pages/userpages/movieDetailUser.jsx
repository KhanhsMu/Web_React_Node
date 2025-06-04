import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../../services/moviesServices"
import {
  getCommentsByMovie,
  createComment,
  updateComment,
  deleteComment,
} from "../../services/commentService";
import { addFavorite, deleteFavorite, getFavorite } from "../../services/favoriteServices";
import { getEpisodesByMovie } from "../../services/episodeServices";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Header"
import { totalView } from "../../services/viewServices";

export default function MovieDetailUser() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editId, setEditId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [view, setView] = useState(null)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    console.log("User hiện tại:", user);
  }, [user]);

  useEffect(() => {
    console.log("Danh sách bình luận:", comments);
  }, [comments]);

  // Load movie và comment
  useEffect(() => {
    async function fetchData() {
      try {
        const movieRes = await getMovieById(id);
        setMovie(movieRes.data.data);

        const commentRes = await getCommentsByMovie(id);
        setComments(Array.isArray(commentRes.data.data) ? commentRes.data.data : []);

        const episodeRes = await getEpisodesByMovie(id);
        setEpisodes(Array.isArray(episodeRes.data.data) ? episodeRes.data.data : []);

        const favoriteRes = await getFavorite(user._id)
        console.log(favoriteRes.data)
        const isFavorite = favoriteRes.data?.data?.some(f => f._id === id);
        setFavorite(isFavorite);

        const viewRes = await totalView(id);
        setView(viewRes.data.totalViews)

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }

    fetchData();
  }, [id, user]);

  // Thêm hoặc cập nhật bình luận
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    if (!commentText.trim()) {
      alert("Nội dung bình luận không được để trống.");
      return;
    }

    try {
      if (editId) {
        await updateComment(editId, { commentText });
      } else {
        await createComment({
          movieId: id,
          userId: user._id,
          commentText,
        });
      }
      setCommentText("");
      setEditId(null);
      // Cập nhật lại bình luận mới nhất
      const commentRes = await getCommentsByMovie(id);
      setComments(Array.isArray(commentRes.data.data) ? commentRes.data.data : []);
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi bình luận.");
    }
  };

  // Xóa bình luận
  const handleDelete = async (commentId) => {
    if (window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter(c => c._id !== commentId));
      } catch (error) {
        console.error("Lỗi khi xóa:", error.response?.data || error.message);
        alert("Có lỗi xảy ra khi xóa bình luận.");

      }
    }
  };

  // Bắt đầu sửa bình luận
  const handleEdit = (comment) => {
    setEditId(comment._id);
    setCommentText(comment.commentText);
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để yêu thích phim.");
      return;
    }

    try {
      if (favorite) {
        await deleteFavorite(user._id, id);
        setFavorite(false);
      } else {
        await addFavorite(user._id, id);
        setFavorite(true);
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi cập nhật yêu thích.");
    }
  };

  if (!movie) return <p>Đang tải...</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Movie info */}
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1 space-y-3">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <p className="text-sm italic text-yellow-300">{movie.englishTitle || ""}</p>
              <p><span className="font-semibold">Mô tả:</span> {movie.description}</p>
              <p><span className="font-semibold">Ngày phát hành:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Thể loại:</span> {movie.category?.map(c => c.name).join(", ") || "Không rõ"}</p>
              <p><span className="font-semibold">Lượt xem:</span> {view}</p>
              <button
                onClick={handleToggleFavorite}
                className={`mt-2 px-4 py-2 rounded-full font-semibold shadow ${favorite ? 'bg-pink-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                {favorite ? " Đã yêu thích" : " Thêm vào yêu thích"}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Tập phim</h3>

            {episodes.length === 0 ? (
              <p>Chưa có tập phim nào.</p>
            ) : episodes.length === 1 ? (
              <div className="flex">
                <button
                  onClick={() => navigate(`/watch/${episodes[0]._id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full shadow"
                >
                  Xem phim
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {episodes.map((ep, index) => (
                  <button
                    key={ep._id}
                    onClick={() => navigate(`/watch/${ep._id}`)}
                    className="bg-gray-700 hover:bg-yellow-500 hover:text-black text-white font-semibold py-2 px-5 rounded-full shadow transition"
                  >
                    Tập {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Bình luận</h3>

            {user && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder={editId ? "Chỉnh sửa bình luận..." : "Viết bình luận..."}
                  rows={4}
                  className="w-full bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring focus:ring-yellow-500 text-white"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-full"
                  >
                    {editId ? "Cập nhật" : "Gửi"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(null);
                        setCommentText("");
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-5 rounded-full"
                    >
                      Huỷ
                    </button>
                  )}
                </div>
              </form>
            )}

            <div className="mt-6 space-y-4">
              {comments.length === 0 && <p>Chưa có bình luận nào.</p>}
              {comments.map((c) => {
                const isOwner = user && user._id === c.userId?._id;
                return (
                  <div
                    key={c._id}
                    className="bg-gray-800 rounded-lg p-4 shadow"
                  >
                    <p className="font-bold text-yellow-300">{c.userId?.userName || "Ẩn danh"}</p>
                    <p className="text-sm mt-1">{c.commentText}</p>
                    {isOwner && (
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleEdit(c)}
                          className="text-blue-400 hover:underline text-sm"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-400 hover:underline text-sm"
                        >
                          Xoá
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
