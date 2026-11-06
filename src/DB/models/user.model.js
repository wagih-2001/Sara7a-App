import mongoose from 'mongoose';
import {
  GenderEnum,
  ProviderEnum,
  RoleEnum,
} from '../../Utils/enums/user.enums.js';
import { OTPEnum } from '../../Utils/enums/otp.enums.js';

// OTP Schema
const otpSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      select: false
    },
    type: {
      type: String,
      enum: Object.values(OTPEnum),
      required: true
    },
    expiresIn: {
      type: Date,
      required: true
    },
    attempts: {
      type: Number,
      default: 0
    }
  },
  {
    _id: false
  }
);

// User Schema
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
      default: RoleEnum.User
    },
    provider: {
      type: Number,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.SYSTEM
    },

    // OTP
    otp: {
      type: [otpSchema],
      default: []
    },

    confirmEmail: Date,
    profilepic: String,
    coverpic: [String]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.otp;
        return ret;
      }
    }
  }
);

userSchema.virtual('username').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
