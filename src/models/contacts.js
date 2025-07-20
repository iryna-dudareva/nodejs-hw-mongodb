import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    favorite: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const contactsCollection = model('contacts', contactsSchema);
