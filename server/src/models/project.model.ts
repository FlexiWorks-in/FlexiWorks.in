import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    budget: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    skills: [String],
    deadline: Date,
    status: {
      type: String,
      enum: ['open', 'closed', 'completed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.projects || mongoose.model('projects', projectSchema);

export default Project;
