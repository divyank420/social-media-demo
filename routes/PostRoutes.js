import {Router} from "express";
import PostController from "../controllers/PostController.js";


const PostRoutes = Router();

PostRoutes.get('/',PostController.getAllPosts);
PostRoutes.post('/add-post',PostController.createPost);
PostRoutes.post('/add-post-comment',PostController.addComment);
PostRoutes.post('/like-unlike-post',PostController.likeUnLikePost);

export default PostRoutes;