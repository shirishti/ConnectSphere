const UserModel = require("../../../models/UserModel");
const ProfileModel = require("../../../models/ProfileModel");
const FollowerModel = require("../../../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");



export default async function handler(req, res) {
 
    if (req.method === 'POST') {
        const {
            name,
            email,
            username,
            password,
            bio,
            facebook,
            youtube,
            twitter,
            instagram
        } = req.body.user;  
        if (!isEmail(email)) return res.status(401).send("Invalid Email");
    
      if (password.length < 6) {
        return res.status(401).send("Password must be atleast 6 characters");
        }
        
        try {
            let user;
            user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                return res.status(401).send("User already registered");
            }
     
            //creating a new user entry
            user = new UserModel({
                name,
                email: email.toLowerCase(),
                username: username.toLowerCase(),
                password,
                profilePicUrl: req.body.profilePicUrl
            });
            
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
            await user.save();
    
            let profile = {};
            profile.user = user._id;
    
            profile.bio = bio;
    
            profile.social = {};
            if (facebook) profileFields.social.facebook = facebook;
            if (youtube) profileFields.social.youtube = youtube;
            if (instagram) profileFields.social.instagram = instagram;
            if (twitter) profileFields.social.twitter = twitter;
        
            await new ProfileModel(profileFields).save();
            await new FollowerModel({ user: user._id, followers: [], following: [] }).save();
    
            const token = jwt.sign(
               {userId:user._id},
                process.env.JWT_SECRET,
                { expiresIn: '1d' },
                (err, token) => { 
                    if (err) throw err;
                    res.status(200).json(token);   
                }
              );
        } catch (error) {
            console.log(error);
            return res.status(500).send('Server error');
        }
    }
}
