const Job = require('../models/Job');
const mongoose = require('mongoose');
exports.createJobService = async (data) => {
  const result = await Job.create(data);
  return result;
};
exports.getJobByIdService = async (id) => {
  const result = await Job.find({ _id: id });
  return result;
};
exports.getJobsService = async () => {
  const result = await Job.find({})
    .populate('applicants.id')
    .populate('postedBy.id');
  return result;
};
exports.getManagerJobService = async (managerId) => {
  const result = await Job.find({ 'postedBy.id': managerId });
  return result;
};
exports.getManagerJobDetailsByIdService = async (id) => {
  const result = await Job.find({ email });
  return result;
};
exports.updateJobService = async (id, data) => {
  const result = await Job.updateOne({ _id: id }, { $set: data });
  return result;
};
exports.applyJobService = async (jobId, candidateId) => {
  const job = await Job.updateOne(
    { _id: jobId },
    { $push: { applicants: candidateId } }
  );

  return job;
};
