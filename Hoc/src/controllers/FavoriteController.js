import FavoriteModel from "../models/FavoriteModel.js";
import MovieModels from "../models/MovieModels.js";

export const addFavorite = async (req , res) =>{
    const {userId , movieId} = req.body;
    try {
        const exists = await FavoriteModel.findOne({userId, movieId})
        if(exists) return res.status(400).json({error: "Phim đã tồn tại trong danh sách"})
        const newFavorite = await FavoriteModel.create({userId, movieId})
        res.json({success: true , data: newFavorite})
    } catch (err) {
        res.status(500).json({error:"Lỗi khi thêm vào yêu thích"})
    }
};

export const deleteFavorite = async(req, res) =>{
const {userId, movieId} = req.body

try {
    await FavoriteModel.deleteOne({userId, movieId})
    res.json({success: true})
} catch (err) {
    res.status(500).json({error:"Lỗi khi xóa phim yêu thích"})
}
};

export const getFavorite = async (req, res) =>{
const {userId} = req.params
try {
    const favorite = await FavoriteModel.find({userId}).populate("movieId")
    res.json({ success: true, data: favorite.map(f => f.movieId) });
} catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách yêu thích" });
  }
};