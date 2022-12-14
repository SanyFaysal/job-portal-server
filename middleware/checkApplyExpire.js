const Job = require('../models/Job');

exports.checkApplyExpire = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const findJob = await Job.findOne({ _id: id });
    const currentDate = new Date();
    const expireDate = findJob.dateline;
    if (currentDate > expireDate) {
      return res.status(400).json({
        status: 'failed',
        message: 'Your applying date is expired',
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
