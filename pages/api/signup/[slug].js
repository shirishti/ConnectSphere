import UserModel from "../../../models/UserModel";
import ProfileModel from "../../../models/ProfileModel";
import FollowerModel from "../../../models/FollowerModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/router";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;


export default async function handler(req, res) {
    if (req.method === 'GET') {
        
        const  username  = req.query.slug;
        console.log(username);
             try {
            if (username.length < 1) return res.status(401).send("Invalid");
    
            if (!regexUserName.test(username)) return res.status(401).send("Invalid");
    
            const user = await UserModel.findOne({ username: username.toLowerCase() });
    
            if (user) return res.status(401).send("Username already taken");
    
            return res.status(200).send("Available");
        } catch (error) {
            console.log("here");
            console.error(error);
            return res.status(500).send(`Server error`);
        }
       
    }

    
}