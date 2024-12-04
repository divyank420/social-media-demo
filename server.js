import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import PostRoutes from "./routes/PostRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";
import AuthRouter from "./routes/AuthRoutes.js";


const app = express();
const port = 8012;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/social-media')

app.get('/', (req,res)=>res.send('<h1>Hello</h1>'));

app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRoutes);
app.use('/api/comments', CommentRoutes);


app.listen(port,
    console.log('Server is running on port:',port)
)