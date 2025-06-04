import { singInValidation, singUpValidation } from "../validation/UserValidation.js"
import User from "../models/UserModels.js"
import { request } from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import UserModels from "../models/UserModels.js"
import BlacklistToken from "../models/BlacklistToken.js"

dotenv.config();

const {SECRET_CODE} = process.env
export const signUp = async (req,res) => {
    try {
        // bước 1 validate dữ liệu người dùng
        const {error} = singUpValidation.validate(req.body, { abortEarly: false})
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        // bước 2 kiểm tra email có tồn tại trong hệ thống hay chưa
        const userExists = await User.findOne({email: req.body.email})
        if( userExists){
            return res.status(400).json({
                message: "Email này đã được đăng kí bạn có muốn đăng nhập không?"
            })
        }
        // Mã hóa password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        // Khởi tạo User cho data
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })
        //thông báo cho người dùng
        // xóa mật khẩu đi
        user.password = undefined
        return res.status(200).json({
            message: "Đăng kí account thành công !",
            user
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
}
export const signIn = async (req, res) => {
  try {
    // Validate dữ liệu (bỏ qua phần validate để ngắn gọn, sếp tự thêm)
    const {error} = singInValidation.validate(req.body, {abortEarly:false})
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }
    // Tìm user theo email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email chưa đăng ký" });
    }

    // So sánh mật khẩu
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo JWT
    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, { expiresIn: '1d' });

    // Ẩn password trước khi trả về client
    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user,accessToken
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Chưa đăng nhập" });

    const token = authHeader.split(" ")[1];

    // Giải mã token để lấy thời gian hết hạn
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: "Token không hợp lệ" });
    }

    // Tính thời gian token hết hạn (giây -> ms)
    const expiredAt = new Date(decoded.exp * 1000);

    // Thêm token vào blacklist
    await BlacklistToken.create({ token, expiredAt });

    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAllAuth = async(req ,res )=>{
    try {
        
        const auth = await UserModels.find();
        if(auth.length === 0)
        {
            return res.status(404).json({
                message:"Khong tim thay danh sach nguoi dung",
            });
        }
            return res.status(200).json({
                message:"Hien thi danh sach  nguoi dung thanh cong",
                data: auth,
            });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}


export const getDetailAuth = async(req,res) =>{
    try {
        
    const email = req.params.email;
    const user = await UserModels.find({email});
   if(!user)
   {
      return res.status(404).json({
          message: " Khong tim thay nguoi dung"
      });
   }
   return res.status(200).json({
      message : "Nguoi dung da duoc tim thay",
      data: user,
   });
       
   } catch (error) {
        console.error(error);
       res.status(500).json({
           message: error.message,
       });
   }
   }

export const getUserInfor= async(req,res) =>{
    try {
    const user = await UserModels.findById(req.user.id).select('-password');
  //  const user = await User.findById(req.user.userId);
   if(!user)
   {
      return res.status(404).json({
          message: " Khong tim thay thong tin nguoi dung"
      });
   }
   return res.status(200).json({
      message : "Thông tin cá nhân",
      data: user,
   });
       
   } catch (error) {
        console.error(error);
       res.status(500).json({
           message: error.message,
       });
   }
}

export const removeAuth = async (req, res) => {
    try {
        const email = req.params.email || req.body.email; 
        const data = await UserModels.findOneAndDelete({ email });

        if (!data) {
            return res.status(404).json({
                message: 'Không tìm thấy tài khoản với email này',
            });
        }
        return res.status(200).json({
            message: 'Xóa tài khoản thành công',
            data: data,  
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUserInfor = async (req, res) => {
  try {
    const updates = req.body;

    // Tùy chọn: kiểm tra thủ công nếu muốn
    if (!updates.userName || !updates.role) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ tên và vai trò",
      });
    }

    const updatedUser = await UserModels.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng để cập nhật",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thông tin thành công",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message, // tránh [object Object]
    });
  }
};


