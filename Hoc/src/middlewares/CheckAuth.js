import jwt from "jsonwebtoken"
import User from "../models/UserModels.js"
import dotenv from "dotenv"
import BlacklistToken from "../models/BlacklistToken.js";

dotenv.config();
const {SECRET_CODE} = process.env
export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Chưa đăng nhập" });

    const token = authHeader.split(" ")[1];

    // Kiểm tra token có trong blacklist không
    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: "Token đã bị thu hồi" });

    // Giải mã token
    const decoded = jwt.verify(token, process.env.SECRET_CODE);

    req.user = { id: decoded._id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};

