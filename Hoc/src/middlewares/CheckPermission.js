import jwt from "jsonwebtoken"
import User from "../models/UserModels.js"
import dotenv from "dotenv"

dotenv.config();
const {SECRET_CODE} = process.env
export const checkPermission = async(req,res, next) =>{
    try {
        // Kiểm tra người dùng đăng nhập hay chưa
        const token = req.headers.authorization?.split(" ")[1];

        // Kiểm tra token
        if(!token){
            return res.status(403).json({
                message: "Bạn chưa đăng nhập",
            });
        }
        // kiểm tra quyền của người dùng
        const decoded = jwt.verify(token,SECRET_CODE);
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(403).json({
                message: "Token lỗi",
            })
        }
        req.user = user;
        if (user.role !== "admin") {
            return res.status(400).json({
                message:"Bạn không có quyền truy cập"
            });
        }
        next();
    } catch (error) {
        return res.json({
            name: error.name,
            message: error.message,
        });
    }
};