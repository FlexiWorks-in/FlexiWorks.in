import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'comments' },
    likes: Number,
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.comments || mongoose.model('comments', commentSchema);

export default Comment;
