import { model, Schema, Types } from "mongoose";
import { dateScheme } from "./utils/constants.js";

const CommentSchema = Schema({
    user_id: {
        type: Types.ObjectId,
        ref:'User'
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    comment: {
        type: "string",
        required:true
    },
    created_at:dateScheme,
    updated_at:dateScheme
});

export const Comment = model('Comment', CommentSchema);
