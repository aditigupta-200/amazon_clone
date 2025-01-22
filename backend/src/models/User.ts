import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  _id: mongoose.Schema.Types.ObjectId; // Ensure `_id` is explicitly typed
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
