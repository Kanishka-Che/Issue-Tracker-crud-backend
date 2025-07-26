import express from 'express';

import {
  getAllIssues,getIssue,createIssue,updateIssue,deleteIssue
} from '../controllers/issueController.js';

const router = express.Router();


router.get('/', getAllIssues);
router.get('/:id', getIssue);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

export default router;
