import express from "express";
import { createMovie, getAllMovie, getDetailMovie, removeMovie, updateMovie,searchMovie } from "../controllers/MovieControllers.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { checkAuth } from "../middlewares/CheckAuth.js";


const routerMovie = express.Router();

routerMovie.get('/',getAllMovie);
routerMovie.post('/',createMovie);
routerMovie.get('/search',searchMovie);
routerMovie.get('/:id',getDetailMovie);
routerMovie.put('/:id',checkAuth,updateMovie);
routerMovie.delete('/:id',checkAuth,removeMovie)


export default routerMovie;