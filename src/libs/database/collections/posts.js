import mongoose, { Schema } from 'mongoose';
import users from './users';

const { Types } = Schema;

const model = new Schema(
  {
    title: {
      type: Types.String,
      required: true
    },
    content: {
      type: Types.String,
      required: true
    },
    imagesUrls: [
      {
        type: Types.String
      }
    ],
    isPublish: {
      type: Types.Boolean,
      default: false
    },
    userId: {
      type: Types.ObjectId,
      ref: 'users'
    },
    comments: [
      {
        userId: {
          type: Types.ObjectId,
          ref: 'users',
          required: true
        },
        parentId: {
          type: Types.ObjectId,
          ref: 'users'
        },
        content: Types.String
      }
    ],
    likes: {
      qty: Types.Number,
      users: [
        {
          type: Types.ObjectId,
          ref: 'users'
        }
      ]
    },
    isActive: {
      type: Types.Boolean,
      default: true
    }
  },
  {
    strict: true,
    timestamps: true,
    collection: 'addictions'
  }
);

export default mongoose.model('addictions', model);
