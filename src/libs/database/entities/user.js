import { Schema } from 'mongoose';

const { Types } = Schema;

const user = {
  name: 'user',
  priority: 0,
  schema: new Schema({
    name: {
      type: Types.String
    },
    lastname: {
      type: Types.String
    },
    email: {
      type: Types.String
    },
    profile: {
      type: Types.String
    },
    addiction: {
      type: Types.ObjectId
    }
  })
};

export default user;
