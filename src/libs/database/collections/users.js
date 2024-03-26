import mongoose, { Schema } from 'mongoose';

const { Types } = Schema;

const model = new Schema(
  {
    name: {
      type: Types.String,
      required: true
    },
    lastname: {
      type: Types.String,
      required: true
    },
    email: {
      type: Types.String,
      required: true,
      unique: true
    },
    password: {
      type: Types.String,
      required: true
    },
    profileUrl: Types.String,
    addictionId: {
      type: Types.ObjectId,
      required: function () {
        return this.role === 'patient';
      },
      ref: 'addictions'
    },
    role: {
      type: Types.String,
      enum: ['admin', 'professional', 'patient']
    },
    context: Types.String,
    notes: [
      {
        description: Types.String,
        emotion: Types.Number
      }
    ],
    goals: [
      {
        title: Types.String,
        description: Types.String,
        isComplete: Types.String
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
    collection: 'users'
  }
);

model.post('save');

export default mongoose.models.users || mongoose.model('users', model);
