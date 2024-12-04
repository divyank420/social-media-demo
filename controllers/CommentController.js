import { Comment } from "../models/Comment.js"
import Post from "../models/Post.js";

const CommentController = {
    async getAllPostComments(req,res){
        try {
            const comments = await Comment.find({post_id:req.params.id}).sort({'created_at':-1});
            return res.status(201).json(comments);
        } catch (error) {
            
        }

    },
    async deletePostComments(req,res){
        try {
            let commentId = req.params.id;
            let deletedComment = await Comment.deleteOne({_id:commentId});
            if(deletedComment.deletedCount == 1){
                const post = await Post.findById(req.params.post_id);
                post.comments = post.comments.filter((comment)=>comment.toString() !== commentId);
                post.save();
                return res.status(201).json(post);
            }
            return res.status(404).json({ message: 'Not Found', error });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong', error });
        }

    }
}

export default CommentController;