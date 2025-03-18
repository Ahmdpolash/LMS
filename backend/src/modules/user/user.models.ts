import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

import bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Please Enter your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [false, "Please Enter your Password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: { type: String },
      url: { type: String },
    },
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    courses: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

// HASH PASSWORD BEFORE SAVING

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// //post empty string after saving password
// UserSchema.post("save", async function (doc, next) {
//   doc.password = "";
//   next();
// });

// COMPARE PASSWORD

// UserSchema.methods.isPasswordMatched = async function (plainTextPassword:string) {
//   return await bcrypt.compare(plainTextPassword, this.password);
// };

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// FIND USER BY ID
UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

export const User = model<IUser, UserModel>("Users", UserSchema);
