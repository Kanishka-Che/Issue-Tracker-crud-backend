import Issue from '../models/issue.js';


export async function getAllIssues  (req, res){
  const issues = await Issue.find();
  res.json(issues);
};

export async function getIssue (req, res){
  const issue = await Issue.findById(req.params.id);
  res.json(issue);
};

export  async function createIssue (req, res) {
  const issue = await Issue.create(req.body);
  res.status(201).json(issue);
};

export  async function updateIssue (req, res) {
  const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export async function deleteIssue (req, res){
  await Issue.findByIdAndDelete(req.params.id);
  res.json({ message: 'Issue deleted' });
};
