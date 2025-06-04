import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiredAt: { type: Date, required: true }, // để tự động xóa token hết hạn khỏi blacklist
});

blacklistTokenSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 }); // tự động xóa doc khi expiredAt đến

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;
