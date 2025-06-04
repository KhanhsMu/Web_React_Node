import express, { Router } from "express";
import routerAuth from "./UserRouter.js";
import routerCategory from "./CategoryRouter.js";
import routerMovie from "./MovieRouter.js";
import routerComment from "./CommentRouter.js";
import routerEpisode from "./EpisodeRouter.js";
import cors from "cors";
import routerView from "./ViewRouter.js";
import routerFavorite from "./FavoriteRouter.js"
const router = Router()

router.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));


router.use('/movie',routerMovie);
router.use('/category', routerCategory);
router.use('/auth',routerAuth);
router.use('/comment',routerComment);
router.use('/view',routerView );
router.use('/favorite', routerFavorite)


export default router;