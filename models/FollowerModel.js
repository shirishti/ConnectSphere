const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowerSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ],

  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ]
});

module.exports = mongoose.model("Follower", FollowerSchema);
// // module.exports = mongoose.models.Follower || mongoose.model('Follower', FollowerSchema);
