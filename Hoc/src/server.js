import express from 'express';
import { connect } from './config/db.js';
import dotenv from "dotenv";
import routerMovie from './router/MovieRouter.js';
import routerCategory from './router/CategoryRouter.js';
import router from './router/index.js';
// import Product from './models/product.js';
// import router from './router/index.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routerEpisode from './router/EpisodeRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
dotenv.config()
const PORT = process.env.PORT;
connect();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
router.use('/episode',routerEpisode)
app.use(express.json());
app.use(router);


app.listen(PORT,()=>{
    console.log(`Server is running on post ${PORT}`);
});