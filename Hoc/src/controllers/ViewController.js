import EpisodeModel from "../models/EpisodeModel.js";
import ViewModel from "../models/ViewModel.js";
import mongoose from "mongoose";

export const increaseView = async(req, res) =>{
    const episodeId = req.params.episodeId
    try{
        const episode = await EpisodeModel.findById(episodeId)
        const movieId = episode.movieId
        let view = await ViewModel.findOne({episodeId});
        if(!view){
            view = new ViewModel({episodeId,movieId, count :1})
        }else{
            view.count+=1;
        }
        await view.save();
        res.json({success:true, views: view.count})
    }catch(error){
        console.log("Lỗi tăng lượt xem:" , error);
        res.status(500).json({error: "Không thể cập nhật lượt xem"})
    }
}

export const totalView = async (req , res) =>{
    const {movieId} = req.params

    
    try{
        const result = await ViewModel.aggregate([
      { $match: { movieId: new mongoose.Types.ObjectId(movieId) } },
      {
        $group: {
          _id: "$movieId",
          totalViews: { $sum: "$count" }
        }
      }
    ]);

    res.json({
      success: true,
      totalViews: result[0]?.totalViews || 0
    });
  } catch (error) {
    console.error("Lỗi khi lấy tổng lượt xem:", error);
    res.status(500).json({ error: "Không thể lấy tổng lượt xem" });
  }
};
export const allView = async (req, res) => {
  try {
    const result = await ViewModel.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$count" }
        }
      }
    ]);

    res.json({
      success: true,
      totalViews: result[0]?.totalViews || 0
    });
  } catch (error) {
    console.error("Lỗi khi lấy tổng lượt xem toàn bộ:", error);
    res.status(500).json({ error: "Không thể lấy tổng lượt xem" });
  }
};