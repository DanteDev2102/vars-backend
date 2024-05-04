import mongoose, { Schema } from 'mongoose';

const { Types } = Schema;

const model = new Schema(
  {
    isActive: {
      type: Types.Boolean,
      default: true
    },
    patient: {
      type: Types.ObjectId,
      ref: 'users'
    },
    professional: {
      type: Types.ObjectId,
      ref: 'users'
    },
    points: Types.Number,
    context: Types.String,
    date: Types.Number
  },
  {
    strict: true,
    timestamps: true,
    collection: 'users'
  }
);

export default mongoose.model('progress', model);
