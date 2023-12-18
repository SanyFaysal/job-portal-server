const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,

      minLength: [3, "title is too small"],
    },
    blog: {
      type: String,
      required: [true, "Please provide a details"],
      trim: true,

      minLength: [3, "Details is too small"],
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    likes: {
      likesCount: {
        type: Number,
        default: 0,
      },
      LikedBy: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    comments: [
      {
        question: {
          qus: String,
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          quesBy: {
            type: ObjectId,
            ref: "User",
          },
        },
        answer: [
          {
            ans: String,
            createdAt: {
              type: Date,
              default: Date.now(),
            },
            ansBy: {
              type: ObjectId,
              ref: "User",
            },
          },
        ],
      },
    ],
    status: {
      type: String,
      default: "published",
      enum: {
        values: ["pause", "published"],
        message: "{VALUE} can't be a status",
      },
    },
  },
  {
    timeStamps: { createdAt: true, updatedAt: false },
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
