import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getAllEpisode , addEpisode , deleteEpisode , updateEpisode ,getEpisodeById} from "../controllers/EpisodeController.js";
import { checkAuth } from "../middlewares/CheckAuth.js";

const routerEpisode = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/videos")); // thư mục lưu video
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage });

routerEpisode.get('/:movieId', getAllEpisode);
routerEpisode.get('/watch/:id', getEpisodeById);
routerEpisode.post('/', upload.single("video"), addEpisode);
routerEpisode.put('/:episodeId', updateEpisode); 
routerEpisode.delete('/:episodeId', deleteEpisode); 

export default routerEpisode
