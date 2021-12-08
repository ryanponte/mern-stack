import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  name: String,
  avatar: String,
  likes: [
    {
      user: Schema.Types.ObjectId,
    },
  ],
  comments: [
    {
      user: Schema.Types.ObjectId,
      text: {
        type: String,
        required: true,
      },
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('post', PostSchema);

export default Post;
