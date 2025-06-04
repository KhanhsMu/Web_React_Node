import express from "express"
import { addFavorite , deleteFavorite ,getFavorite } from "../controllers/FavoriteController.js"

const routerFavorite = express.Router()
routerFavorite.delete('/delete', deleteFavorite)
routerFavorite.get('/:userId', getFavorite)

routerFavorite.post('/', addFavorite)

export default routerFavorite