const Job = require('../models/Job');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.createJobService = async (data, hiringManager) => {
  const { _id, name } = hiringManager;
  data.postedBy = {
    id: _id,
    name: name,
  };
  const result = await Job.create(data);
  return { result };
};
exports.getJobByIdService = async (id) => {
  const result = await Job.find({ _id: id })
    .populate('postedBy.id')
    .populate('applicants');
  return result;
};
exports.getJobsService = async (filter, sortJob) => {
  const result = await Job.find({}).where(filter).sort(sortJob.sortBy);
  // .populate('applicants')
  // .populate('postedBy.id');
  return result;
};
exports.getManagerJobService = async (managerId) => {
  const result = await Job.find({ 'postedBy.id': managerId }).populate(
    'applicants'
  );
  return result;
};
exports.getManagerJobByIdService = async (managerId, jobId) => {
  const result = await Job.find({
    _id: jobId,
    'postedBy.id': managerId,
  }).populate('applicants');
  return result;
};
exports.updateJobService = async (id, data) => {
  const result = await Job.updateOne({ _id: id }, { $set: data });
  return result;
};
exports.applyJobService = async (jobId, candidateId) => {
  const updateJob = await Job.updateOne(
    { _id: jobId },
    { $push: { applicants: candidateId } }
  );
  const updateCandidate = await User.updateOne(
    { _id: candidateId },
    { $push: { applications: jobId } }
  );

  return { updateJob, updateCandidate };
};
