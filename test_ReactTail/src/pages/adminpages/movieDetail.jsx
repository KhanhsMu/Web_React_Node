import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentsByMovie,
  createComment,
  deleteComment,
  updateComment
} from "../../services/commentService";
import { getMovieById } from "../../services/moviesServices";
import { getEpisodesByMovie, createEpisode, updateEpisode, deleteEpisode } from "../../services/episodeServices";
import AdminHeader from "../../components/AdminHeader"
function AddComment({ movieId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({ movieId, commentText });
      setCommentText("");
      onCommentAdded();
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
    }
  };
  useEffect
  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <textarea
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Nhập bình luận..."
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Thêm bình luận</button>
    </form>
  );
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [editEpisodeId, setEditEpisodeId] = useState(null);
  const [episodeForm, setEpisodeForm] = useState({
    title: "",
    episodeNumber: "",
    videoUrl: ""
  });

  const fetchComments = async () => {
    try {
      const res = await getCommentsByMovie(id);
      setComments(Array.isArray(res.data.data) ? res.data.data : []);
      const resEpisode = await getEpisodesByMovie(id)
      setEpisodes(Array.isArray(resEpisode.data.data) ? resEpisode.data.data : []);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getMovieById(id);
        setMovie(res.data.data);
        await fetchComments();
      } catch (error) {
        console.error("Lỗi khi tải phim hoặc bình luận:", error);
      }
    })();
  }, [id]);

  const handleDelete = async (cmtId) => {
    try {
      await deleteComment(cmtId);
      setComments(comments.filter(c => c._id !== cmtId));
    } catch (error) {
      console.error("Lỗi khi xoá bình luận:", error);
    }
  };

  const handleEdit = (cmt) => {
    setEditId(cmt._id);
    setCommentText(cmt.commentText);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateComment(editId, { commentText });
      setEditId(null);
      setCommentText("");
      await fetchComments();
    } catch (error) {
      console.error("Lỗi khi cập nhật bình luận:", error);
    }
  };

  const handleEpisodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("movieId", id);
      formData.append("title", episodeForm.title);
      formData.append("episodeNumber", episodeForm.episodeNumber);
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // In ra kiểm tra giá trị form
      }
      if (episodeForm.videoUrl) {
        formData.append("video", episodeForm.videoUrl);
      }

      if (editEpisodeId) {
        // TODO: Xử lý update nếu bạn muốn cập nhật video
        alert("Cập nhật tập hiện chưa hỗ trợ đổi video.");
      } else {
        await createEpisode(formData); // gửi FormData
      }

      setEpisodeForm({ title: "", episodeNumber: "", videoFile: null });
      setEditEpisodeId(null);
      await fetchComments();
    } catch (error) {
      console.error("Lỗi xử lý tập phim:", error);
    }
  };

  const handleEpisodeEdit = (ep) => {
    setEditEpisodeId(ep._id);
    setEpisodeForm({
      title: ep.title,
      episodeNumber: ep.episodeNumber,
      videoUrl: ep.videoUrl
    });
  };

  const handleEpisodeDelete = async (epId) => {
    try {
      await deleteEpisode(epId);
      await fetchComments();
    } catch (error) {
      console.error("Lỗi xoá tập phim:", error);
    }
  };

  if (!movie) {
    return <p>Đang tải...</p>;
  }

  return (
    <><AdminHeader />
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <img src={movie.imageUrl} alt={movie.title} className="w-full h-60 object-cover rounded" />
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p><b>Mô tả:</b> {movie.description}</p>
          <p><b>Ngày phát hành:</b> {movie.releaseDate?.slice(0, 10)}</p>
          <p><b>Thể loại:</b> {Array.isArray(movie.category) ? movie.category.map(c => c.name).join(", ") : ""}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Danh sách tập phim</h3>
          {episodes.length === 0 ? (
            <p>Chưa có tập phim nào.</p>
          ) : (
            <ul style={{ paddingLeft: 20 }}>
              {episodes.map((ep, index) => (
                <li key={ep._id} className="mb-2">
                  <p><b>Tập {ep.episodeNumber}: {ep.title}</b></p>
                  <div className="space-x-2 text-sm">
                    <button onClick={() => handleEpisodeEdit(ep)} className="text-yellow-600">Sửa</button>
                    <button onClick={() => handleEpisodeDelete(ep._id)} className="text-red-600">Xoá</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleEpisodeSubmit} className="mt-4 space-y-2">
            <input
              type="text"
              value={episodeForm.title}
              onChange={e => setEpisodeForm({ ...episodeForm, title: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Tiêu đề tập"
              required
            />
            <input
              type="number"
              value={episodeForm.episodeNumber}
              onChange={e => setEpisodeForm({ ...episodeForm, episodeNumber: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Số tập"
              required
            />
            <input
              type="file"
              accept="video/*"
              onChange={e => setEpisodeForm({ ...episodeForm, videoUrl: e.target.files[0] })}
              className="w-full border p-2 rounded"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
              {editEpisodeId ? "Cập nhật tập phim" : "Thêm tập phim"}
            </button>
            {editEpisodeId && (
              <button type="button" onClick={() => { setEditEpisodeId(null); setEpisodeForm({ title: "", episodeNumber: "", videoUrl: "" }); }} className="ml-2 px-4 py-1 border rounded">
                Huỷ
              </button>
            )}
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Bình luận</h3>

          {!editId && <AddComment movieId={id} onCommentAdded={fetchComments} />}

          {editId && (
            <form onSubmit={handleUpdate} className="space-y-2 mb-4">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Chỉnh sửa bình luận..."
                required
              />
              <button type="submit" className="bg-yellow-500 text-white px-4 py-1 rounded">Cập nhật</button>
              <button type="button" onClick={() => { setEditId(null); setCommentText(""); }} className="ml-2 px-4 py-1 border rounded">Huỷ</button>
            </form>
          )}

          {comments.length === 0 ? (
            <p>Chưa có bình luận nào.</p>
          ) : (
            comments.map(c => (
              <div key={c._id} className="border-b py-2">
                <p className="font-semibold">{c.userId?.userName ?? "Người dùng ẩn danh"}</p>
                <p>{c.commentText}</p>
                <div className="space-x-2 text-sm">
                  <button onClick={() => handleEdit(c)} className="text-yellow-600">Sửa</button>
                  <button onClick={() => handleDelete(c._id)} className="text-red-600">Xoá</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
