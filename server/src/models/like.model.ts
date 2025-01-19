import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const Like = mongoose.models.likes || mongoose.model('likes', likeSchema);

export default Like;
