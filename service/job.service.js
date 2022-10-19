const Job = require('../models/Job');

exports.createJobService = async (data) => {
  const result = await Job.create(data);
  return result;
};
exports.getJobByIdService = async (id) => {
  const result = await Job.find({ _id: id });
  return result;
};
