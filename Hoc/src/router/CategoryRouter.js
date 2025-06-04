import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, getMoviesByCategoryId, updateCategory } from "../controllers/CategoryControllers.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { checkAuth } from "../middlewares/CheckAuth.js";


const routerCategory = express.Router();

routerCategory.get('/',getAllCategories);
//routerCategory.get('/:id',getCategoryById);
routerCategory.get('/:categoryId',getMoviesByCategoryId)
routerCategory.post('/',checkAuth, createCategory);
routerCategory.put('/:id',checkAuth,updateCategory);
routerCategory.delete('/:id',checkAuth,deleteCategory)

export default routerCategory;
