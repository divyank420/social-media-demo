import { model, Schema } from "mongoose";

const UserSchema = Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:"string",
        unique: true,
        required:true,
    },
    "mobile":{
        type:"number",
        required:true
    },
    "password":{
        type:"string",
        required:true
    },
    "refresh_token":{
        type:"string",
    },
});

export const User = model('User',UserSchema);