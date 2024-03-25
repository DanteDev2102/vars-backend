import mongoose, { Schema } from 'mongoose';

const { Types } = Schema;

const model = new Schema(
  {
    name: {
      type: Types.String,
      required: true
    },
    description: {
      type: Types.String,
      required: true
    },
    resources: [
      {
        url: Types.String,
        title: Types.String,
        description: Types.String,
        isActive: Types.String
      }
    ],
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

export default mongoose.models.addictions || mongoose.model('addictions', model);
