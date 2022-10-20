const {
  createJobService,
  getJobByIdService,
  getJobsService,
  updateJobService,
  getManagerJobService,
  applyJobService,
  getManagerJobDetailsByIdService,
  getManagerJobByIdService,
} = require('../service/job.service');

exports.createJob = async (req, res) => {
  try {
    const data = req.body;
    const hiringManager = req.user;
    const result = await createJobService(data, hiringManager);
    res.status(200).json({
      status: 'Success',
      message: 'Successfully create a job',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.getJobById = async (req, res) => {
  try {
    const id = req.params.id.toString();
    const result = await getJobByIdService(id);
    if (!result) {
      return res.status(400).json({
        status: 'failed',
        message: "Couldn't found any job with this id",
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Successfully get a job',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.getJobs = async (req, res) => {
  try {
    const jobs = await getJobsService();
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all job',
      data: jobs,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.getManagerJob = async (req, res) => {
  try {
    const managerId = req.user._id;
    const results = await getManagerJobService(managerId);
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all of your job posts',
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.getManagerJobById = async (req, res) => {
  try {
    const { _id: managerId } = req.user;
    const { id: jobId } = req.params;
    const results = await getManagerJobByIdService(managerId, jobId);
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get details',
      results,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const jobs = await updateJobService(id, data);

    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all job',
      data: jobs,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const candidateId = req.user._id;
    const result = await applyJobService(jobId, candidateId);
    console.log(result);
    res.status(200).json({
      status: 'Success',
      message: 'Applied successful',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
