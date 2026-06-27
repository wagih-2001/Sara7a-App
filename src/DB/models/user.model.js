import mongoose from 'mongoose';
import {
  GenderEnum,
  ProviderEnum,
  RoleEnum
} from '../../Utils/enums/user.enums.js';
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Mandatory'],
      minlength: 2,
      maxlength: 25
    },
    lastName: {
      type: String,
      required: [true, 'LastName is Mandatory'],
      minlength: 2,
      maxlength: 25
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: function () {
        return this.provider === ProviderEnum.SYSTEM;
      }
    },
    DOB: {
      type: Date
    },
    phone: {
      type: String
    },
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.MALE
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER
    },
    provider: {
      type: Number,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.SYSTEM
    },
    confirmEmail: Date,
    profilepic: String
  },

  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

userSchema
  .virtual('username')
  .set(function (value) {
    const [firstName, lastName] = value.split(' ');
    this.set({ firstName, lastName });
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
