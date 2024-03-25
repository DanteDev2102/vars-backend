import mongoose, { Schema } from 'mongoose';

const { Types } = Schema;

const model = new Schema(
  {
    title: {
      type: Types.String,
      required: true
    },
    description: {
      type: Types.String,
      required: true
    },
    isSend: {
      type: Types.Boolean,
      default: false
    },
    isMarked: {
      type: Types.Boolean,
      default: true
    }
  },
  {
    strict: true,
    timestamps: true,
    collection: 'notifications'
  }
);

export default mongoose.models.addictions || mongoose.model('notifications', model);
