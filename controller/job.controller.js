const {
  createJobService,
  getJobByIdService,
} = require('../service/job.service');

exports.createJob = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await createJobService(data);
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
    const { id } = req.params;
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
