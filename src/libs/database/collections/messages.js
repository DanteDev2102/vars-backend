import mongoose, { Schema } from 'mongoose';

const { Types } = Schema;

const model = new Schema(
  {
    originId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true
    },
    destinyId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true
    },
    content: Types.String,
    fileUrl: Types.String,
    isActive: {
      type: Types.Boolean,
      default: true
    }
  },
  {
    strict: true,
    timestamps: true,
    collection: 'messages'
  }
);

export default mongoose.model('messages', model);
