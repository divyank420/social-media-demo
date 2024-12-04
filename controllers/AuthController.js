import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

import { jwt_secrat } from "../config/config.js";


const AuthController = {
    async login(req,res){
        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        const refreshToken = crypto.randomBytes(64).toString('hex');
        await User.updateOne({ _id: user._id }, { $set: { refresh_token:refreshToken } });

        return res.status(200).json({ token, refreshToken });

    },
    async register(req,res){
        try {
            const {name,email,mobile,password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 8)

            const user = await User.create({name,email,mobile,password:hashedPassword});
            if(user){
                res.status(200).json({message:'User Successfully created'},user);
            }
        } catch (error) {
            res.status(500).json({message:'Something wrong',error});
        }

    }
}

export default AuthController;