import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000
    }
  },
  {
    timestamps: true
  }
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
