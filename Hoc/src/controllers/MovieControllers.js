import MovieModels from "../models/MovieModels.js";
import { movieValidation } from "../validation/MovieValidation.js";

export const getAllMovie = async(req ,res )=>{
    try {
        const movies = await MovieModels.find().populate("category");
        if(movies.length === 0)
        {
            return res.status(404).json({
                message:"Khong tim thay danh sach phim",
            });
        }
            return res.status(200).json({
                message:"Hien thi danh sach  phim thanh cong",
                data: movies,
            });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

export const getDetailMovie = async(req,res) =>{
    try {
        //   res.send('Lay danh sach san pham')
   const movies = await MovieModels.findById(req.params.id).populate("category");
   if(!movies)
   {
      return res.status(404).json({
          message: " Khong tim thay phim"
      });
   }
   return res.status(200).json({
      message : "Danh sach phim duoc tim thay",
      data: movies,
   });
       
   } catch (error) {
        console.error(error);
       res.status(500).json({
           message: error.message,
       });
   }
   }

   export const createMovie = async(req,res) =>{
    try {
        const {error} = movieValidation.validate(req.body);
        if (error) {
            return res.status(400).json(
                {
                    message : error.details[0].message,
                }
            );
        }
        const newmovie = await MovieModels.create(req.body);
        if(!newmovie ){
            return res.status(404).json({
                message:'Them phim khong thanh cong',
            });
        }
        return res.status(200).json({
            message : 'Bo phim da duoc them thanh cong',
            data: newmovie,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}


export const updateMovie = async(req,res) =>{
    try {
        const {error} = movieValidation.validate(req.body);
        if (error) {
            return res.status(400).json(
                {
                    message : error.details[0].message,
                }
            );
        }
        const updateMovie = await MovieModels.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        });
        if(!updateMovie ){
            return res.status(404).json({
                message:'Cap nhap phim không thành công',
            });
        }
        return res.status(200).json({
            message : 'Phim da duoc cap nhap thanh cong',
            data: updateMovie,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}

export const removeMovie = async(req,res) =>{
    try {
        const data = await MovieModels.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: 'Xoa bo phim khong thanh cong',
            });
        }
        return res.status(200).json({
            message: 'Xoa bo phim thanh cong',
            data : data,
        });
    } catch (error) {
        return res.status(200).json({
            message: error,
        })
    }
}

export const searchMovie = async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({
        message: "Vui lòng cung cấp từ khóa tìm kiếm",
      });
    }

    // Tìm kiếm tên phim gần đúng, không phân biệt hoa thường (case-insensitive)
    const movies = await MovieModels.find({
      title: { $regex: keyword, $options: "i" }
    }).populate("category");

    if (movies.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy phim phù hợp",
      });
    }

    return res.status(200).json({
      message: "Tìm kiếm phim thành công",
      data: movies,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
