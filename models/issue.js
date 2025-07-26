import mongoose from "mongoose";

const issueSchema =  mongoose.Schema({
  title: String,
  description: String,
  severity: String,
  priority: String,
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  }
}, { timestamps: true });

const Issue = mongoose.model('issue', issueSchema);
export default Issue;
