const express = require('express');
const jobController = require('../controller/job.controller');
const router = express.Router();

router.route('/').post(jobController.createJob);

router.route('/:id').get(jobController.getJobById);

module.exports = router;
