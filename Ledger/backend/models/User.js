import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;