import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
    movieId : { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required :true},
    title : { type: String , required: true },
    episodeNumber: { type: Number, required: true },
    videoUrl : {type: String, required: true}
})
export default mongoose.model('Episode', episodeSchema)