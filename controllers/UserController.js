import { hash } from "bcryptjs";
import { User } from "../models/User";

export default UserController = {
    async login(req,res){
        
    },
    async register(req,res){
        try {
            const {name,email,mobile,password} = req.body;
            encryptPassword = await hash(password,15);
            console.log(encryptPassword);

            // const user = await User.create({name,email,mobile,password:encryptPassword});
            // if(user){
            //     res.status(201).json({message:'User Successfully created'},user);
            // }
        } catch (error) {
            
        }

    }
}