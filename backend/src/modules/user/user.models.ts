import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

import bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser>(
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
      required: [true, "Please Enter your Password"],
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
    next();
  }

  const user = this;

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// COMPARE PASSWORD
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

export const User = model<IUser>("Users", UserSchema);
