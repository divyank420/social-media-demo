import { dateScheme } from './utils/constants.js';
import { Schema, model, Types } from 'mongoose';

const LikeUnLikeSchem = Schema({
    user_id:{
        type: Types.ObjectId,
        ref:'User',
    },
    created_at:dateScheme,
});

const PostSchema = Schema({
    user: {
        type: Types.ObjectId,ref:'User',
        //required: true
    },
    content: {
        type:"string"
    },
    images: {
        type: [String],
        default: [],
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref:'Comment',
    }],
    likes: [LikeUnLikeSchem],
    created_at :dateScheme,
    updated_at :dateScheme

});

const Post = model('Post', PostSchema);
export default Post;
