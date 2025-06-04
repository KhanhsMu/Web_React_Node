import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
    episodeId : { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required :true, unique:true},
    movieId : {type: mongoose.Schema.Types.ObjectId , ref:'Movie', required:true},
    count : {type: Number, default :0}
})

export default mongoose.model("View", viewSchema)