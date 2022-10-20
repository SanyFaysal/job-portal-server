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
    applyingEmail: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    helplineNumber: {
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
    salary: {
      type: Number,
      required: [true, 'Please provide compensation'],
    },
    currency: {
      type: String,
      default: 'USD',
      enum: {
        values: ['USD', 'BDT'],
        message: "{VALUE} can't be currency",
      },
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
    jobType: {
      type: String,
      required: [true, 'Please provide job type'],
      enum: {
        values: ['remote', 'on-site'],
        message: " Job type must be remote/ on-site. Can't be {VALUE}",
      },
    },
    location: {
      type: String,
      lowercase: true,
      required: [true, 'Please provide your job location'],
    },
    postedBy: {
      name: {
        type: String,
        lowercase: true,
        trim: true,
      },
      id: {
        type: ObjectId,

        ref: 'User',
      },
    },
    dateline: {
      type: Date,
      required: [true, 'Please provide a dateline'],
    },
    applicants: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timeStamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
