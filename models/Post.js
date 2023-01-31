const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes:[
    {
        username:String,
        createdAt:String
    }
  ],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'  //User=> lowercase and pluralize the nam eyou put in the mongoose.model('-> User <--',userSchema) thing
  }
});

module.exports = mongoose.model("Post", postSchema);
