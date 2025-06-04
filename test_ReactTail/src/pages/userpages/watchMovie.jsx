import { increaseView } from "../../services/viewServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEpisodeById } from "../../services/episodeServices";

import Header from "../../components/Header";

export default function Watch() {
  const { episodeId } = useParams();
  const [view, setView] = useState(null)
  const [episodes, setEpisode] = useState(null);

  useEffect(() => {
    async function fetchEpisode() {
      try {
        const res = await getEpisodeById(episodeId);
        const resView = await increaseView(episodeId)
        setEpisode(res.data.data);
        setView(resView.data.views)
      } catch (error) {
        console.error("Lỗi khi tải tập phim:", error);
      }
    }
    fetchEpisode();
  }, [episodeId]);

  if (!episodes) return <p>Đang tải tập phim...</p>;

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h2>{episodes.title}</h2>
        {view !== null && (
          <p style={{ color: "gray", marginBottom: 10 }}>
            {view} lượt xem
          </p>
        )}
        <video width="100%" controls>
          <source src={`http://localhost:8000${episodes.videoUrl}`} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>

        <p style={{ marginTop: 10 }}>{episodes.description || "Không có mô tả."}</p>
      </div>
    </>
  );
}
