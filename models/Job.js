const mongoose = require('mongoose');

const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      lowercase: true,
      minLength: [3, 'Name is too small'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please provide a contact number'],
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    desc: {
      type: String,
      required: [true, 'Minimum description is required'],
    },
    compensation: {
      type: String,
      required: [true, 'Please provide compensation'],
    },
    requirement: {
      type: String,
      required: [true, 'Please provide job requirement'],
    },
    vacancy: {
      type: Number,
      required: [true, 'Please provide your job vacancy number'],
    },
    status: {
      type: String,
      default: 'open',
      enum: {
        values: ['open', 'ended', 'closed'],
        message: "{VALUE} can't be a status",
      },
    },
    postedBy: {
      name: {
        type: String,
        required: [true, 'Provide the name who post this job'],
        lowercase: true,
        trim: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: 'User',
      },
    },
  },
  {
    timeStamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
