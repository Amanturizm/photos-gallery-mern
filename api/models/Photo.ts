import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Schema.Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;
