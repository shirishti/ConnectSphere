import ProfileModel from "../../../models/ProfileModel";
import FollowerModel from "../../../models/FollowerModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import connectDB from "../../../utilsServer/connectDB";
import mongoose from "mongoose";
import UserModel from "../../../models/UserModel";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const {
      name,
      email,
      username,
      password,
      bio,
      facebook,
      youtube,
      twitter,
      instagram,
    } = req.body.user;
    if (!isEmail(email)) return res.status(401).send("Invalid Email");

    if (password.length < 6) {
      return res.status(401).send("Password must be atleast 6 characters");
    }

    try {
      let user;
      user = await UserModel.findOne({ email: email.toLowerCase() });
      if (user) {
        return res.status(401).send("User already registered");
      }

      //creating a new user entry
      user = new UserModel({
        name,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
        profilePicUrl: req.body.profilePicUrl,
      });

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      await user.save();

      let profile = {};
      profile.user = user._id;

      profile.bio = bio;

      profile.social = {};
      if (facebook) profile.social.facebook = facebook;
      if (youtube) profile.social.youtube = youtube;
      if (instagram) profile.social.instagram = instagram;
      if (twitter) profile.social.twitter = twitter;

      await new ProfileModel(profile).save();
      await new FollowerModel({ user: user._id, followers: [], following: [] }).save();

      const token = jwt.sign(
        { userId: user._id },
       "shirishti",
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json(token);
        }
      );

      return res.status(200).send(token);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}
