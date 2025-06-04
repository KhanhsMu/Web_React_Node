import express from "express";
import { createComment, getCommentsByMovie, removeComment, updateComment } from "../controllers/CommentControllers.js";
import { checkAuth } from "../middlewares/CheckAuth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";

const routerComment = express.Router();

routerComment.get('/:movieId',getCommentsByMovie);
routerComment.post('/',checkAuth,createComment);
routerComment.put('/:id',checkAuth,updateComment);
routerComment.delete('/:id',checkAuth,removeComment)
export default routerComment;

