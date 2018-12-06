const mongoose = require('mongoose');

const Follow = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Follow", FollowSchema);
