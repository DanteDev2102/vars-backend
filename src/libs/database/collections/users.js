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
      required() {
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
        emotion: Types.Number,
        date: Types.Number
      }
    ],
    isActive: {
      type: Types.Boolean,
      default: true
    },
    patients: [
      {
        type: Types.ObjectId,
        ref: 'users'
      }
    ],
    nroDoctor: {
      type: Types.String,
      required() {
        return this.role === 'professional';
      }
    },
    isTreatment: {
      type: Types.Boolean,
      required() {
        return this.role === 'patient';
      },
      default: false
    },
    treatment: {
      type: Types.String,
      required() {
        return this.role === 'patient' && this.isTreatment;
      }
    },
    professional: {
      type: Types.ObjectId,
      ref: 'users'
    },
    phone: Types.String,
    title: {
      type: Types.String,
      required() {
        return this.role === 'professional';
      }
    },
    isHealed: {
      type: Types.Boolean,
      default: false
    },
    birthdate: Types.Number
  },
  {
    strict: true,
    timestamps: true,
    collection: 'users'
  }
);

export default mongoose.model('users', model);
