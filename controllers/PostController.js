import { Comment } from "../models/Comment.js";
import Post from "../models/Post.js";

const PostController = {
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate("comments");
      if (!posts) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async createPost(req, res) {
    try {
      //console.log(req.headers['authorization']);
      console.log(req.body);
      res.status(200).json({ message: "Success" });
      
      const {content, images } = req.body;
      const newPost = await Post.create({content, images });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: "Error creating post", error });
    }
  },
  async deletePost(req, res) {
    try {
      const { postId } = req.body;
      const deletePost = await Post.findByIdAndDelete(postId);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: "Error creating post", error });
    }
  },
  async likeUnLikePost(req, res) {
    try {
      const { post_id, user_id } = req.body;
      const post = await Post.findById(post_id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      // Check if the user has already liked the post
      const isLiked = post.likes.some((like) => like.user_id.toString() === user_id);
      let message = 'Post liked successfully';
      if (isLiked) {
        post.likes = post.likes.filter((like)=> like.user_id.toString() !== user_id);
        console.log(post.likes);
        message =  'User has already liked this post';
        // res.status(400).json({ message: 'User has already liked this post' });
        // return;
      }else{
        post.likes.push({ user_id: user_id, created_at: new Date() });
      }
      const updatedPost = await post.save();

      res.status(200).json({
        message: message,
        updatedPost,
      });

    } catch (error) {
        res.status(500).json({ message: 'Error liking post', error });
    }
  },
  async addComment(req, res) {
    try {
      const { post_id, comment } = req.body;
      console.log(req.body);
      const newComment = await Comment.create({ post_id: post_id, comment });
      const post = await Post.findByIdAndUpdate(
        post_id,
        { $push: { comments: newComment._id } },
        { new: true }
      ).populate("comments");
      res.status(201).json(newComment);
    } catch (error) {}
  },
};

export default PostController;
