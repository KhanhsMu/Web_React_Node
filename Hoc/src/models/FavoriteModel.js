import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId , ref:"User", required: true},
    movieId : {type: mongoose.Schema.Types.ObjectId , ref:"Movie", required: true},
    createAt : {type: Date, default: Date.now}
})
export default mongoose.model("Favorite", favoriteSchema)