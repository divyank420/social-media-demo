import { model, Schema, Types } from "mongoose";
import { dateScheme } from "./utils/constants";


const likeUnlikeSchema  = new Schema({
    user:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:'boolean',
        required:true
    },
    created_at:dateScheme,
    updated_at:dateScheme
});

export const LikeUnLike = model('LikeUnlike',likeUnlikeSchema);