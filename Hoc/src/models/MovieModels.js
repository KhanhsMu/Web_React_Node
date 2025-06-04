import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String ,required: true},
  releaseDate: { type: Date , required: true},
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  imageUrl: { type: String , required: true}
});

export default mongoose.model('Movie', movieSchema);  
