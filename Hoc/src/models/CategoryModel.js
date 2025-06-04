import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
});

export default mongoose.model('Category', categorySchema);  