const express = require('express');
const jobController = require('../controller/job.controller');
const { authorization } = require('../middleware/authorizaiton');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router
  .route('/jobs')
  .get(jobController.getJobs)
  .post(verifyToken, authorization('hiring-manager'), jobController.createJob);

router
  .route('/jobs/apply/:id')
  .patch(verifyToken, authorization('candidate'), jobController.applyJob);

router
  .route('/manager/jobs')
  .get(
    verifyToken,
    authorization('hiring-manager'),
    jobController.getManagerJob
  );
router.route('/manager/jobs/:id').get();

router
  .route('/jobs/:id')
  .get(jobController.getJobById)
  .patch(jobController.updateJob);

module.exports = router;
