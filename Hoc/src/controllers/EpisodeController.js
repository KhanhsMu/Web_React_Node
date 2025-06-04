import EpisodeModel from "../models/EpisodeModel.js"
import MovieModels from "../models/MovieModels.js";


export const getAllEpisode = async(req , res) =>{
    try{
        const movieId = req.params.movieId;
        const episode = await EpisodeModel.find({movieId});
        return res.status(200).json({
            message: "Các tập phim của bộ phim",
            data : episode,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : error.message || error
        })
    }
}

export const addEpisode = async (req, res) => {
    try {
    const { movieId, title, episodeNumber } = req.body;
    console.log("req.body:", req.body); // log title, episode
    console.log("req.file:", req.file); // 

    const movie = await MovieModels.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Phim không tồn tại" });

    if (!req.file) return res.status(400).json({ message: "Thiếu file video" });

    const videoUrl = `/uploads/videos/${req.file.filename}`; // Đường dẫn tới video

    const episode = new EpisodeModel({ movieId, title, episodeNumber, videoUrl });
    await episode.save();

    return res.status(201).json({ message: "Thêm tập phim thành công", data: episode });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEpisode = async (req, res) => {
    try {
        const { episodeId } = req.params;
        const { title, episodeNumber, videoUrl } = req.body;

        const updatedEpisode = await EpisodeModel.findByIdAndUpdate(
            episodeId,
            { title, episodeNumber, videoUrl },
            { new: true }
        );

        if (!updatedEpisode) {
            return res.status(404).json({ message: "Không tìm thấy tập phim" });
        }

        return res.status(200).json({ message: "Cập nhật thành công", data: updatedEpisode });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteEpisode = async (req, res) => {
    try {
        const { episodeId } = req.params;

        const deleted = await EpisodeModel.findByIdAndDelete(episodeId);
        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy tập phim để xoá" });
        }

        return res.status(200).json({ message: "Xoá tập phim thành công" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getEpisodeById = async (req, res) => {
  try {
    const episodeId = req.params.id; // ID của tập phim
    const episode = await EpisodeModel.findById(episodeId);

    if (!episode) {
      return res.status(404).json({
        message: "Không tìm thấy tập phim"
      });
    }

    return res.status(200).json({
      message: "Lấy tập phim thành công",
      data: episode
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error
    });
  }
};