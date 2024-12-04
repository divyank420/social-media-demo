import { Router } from "express";
import CommentController from "../controllers/CommentController.js";

const CommentRoutes =  Router();

CommentRoutes.get('/post-comments/:id',CommentController.getAllPostComments);
CommentRoutes.delete('/delete-post-comments/:post_id/:id',CommentController.deletePostComments);

export default CommentRoutes;