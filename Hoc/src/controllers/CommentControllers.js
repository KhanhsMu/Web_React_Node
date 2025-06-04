import CommentModels from "../models/CommentModels.js";
import { commentValidation } from "../validation/CommentValidation.js";
import User from "../models/UserModels.js";

export const getCommentsByMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const comments = await CommentModels.find({ movieId }).populate('userId', 'userName');
    return res.status(200).json({
      message: "Các bình luận cho bộ phim",
      data: comments,
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token (middleware checkAuth)

    const { movieId, commentText } = req.body;

    // Validate dữ liệu đầu vào
    // const { error } = commentValidation.validate({ userId, movieId, commentText });
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }

    const newComment = new CommentModels({ userId, movieId, commentText });

    await newComment.save();

    res.status(201).json({ message: "Bình luận đã được thêm", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: error.message || error });
  }
};

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id; // user id lấy từ token xác thực (middleware checkAuth)

    // Kiểm tra dữ liệu hợp lệ
    const { commentText } = req.body;
    const user = await User.findById(userId)
    if(!user){
      return res.status(401).json({message: "Không tìm thấy"})
    }
    let comment 
    if (user.role==="admin"){
      comment = await CommentModels.findById(commentId)
    }else{
      comment = await CommentModels.findOne({_id : commentId, userId})
    }
    
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy bình luận hoặc bạn không có quyền sửa." });
    }

    // Cập nhật bình luận
    comment.commentText = commentText;
    await comment.save();

    return res.status(200).json({
      message: "Cập nhật bình luận thành công",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

export const removeComment = async(req,res) =>{
    try {
        const data = await CommentModels.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: 'Xoa binh luan khong thanh cong',
            });
        }
        return res.status(200).json({
            message: 'Xoa binh luan thanh cong',
            data : data,
        });
    } catch (error) {
        return res.status(200).json({
            message: error,
        })
    }
}