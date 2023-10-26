import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  /* fullName: { type: String },
    profilePicture: { type: String },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
    accountStatus: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    registrationDate: { type: Date, default: Date.now },*/
},{
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
