import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type IUser = {
  userId: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: "admin" | "user" | "instructor";
  isVerified: boolean;
  isDeleted: boolean;
  status: "active" | "blocked";
  number?: number;
  gender?: "male" | "female";
  age_range?: string;
  internet_type?: string;
  area_type?: string;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
};

export type ISocialAuth = {
  name: string;
  email: string;
  avatar: string;
};

export type IActivteUser = {
  activation_token: string;
  activation_code: string;
};

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isUserExistsByCustomId(id: string): Promise<IUser>;
  isUserExistsByEmail(email: string): Promise<IUser>;
}
export type TUserRole = keyof typeof USER_ROLE;

// device activity model
import { Document } from "mongoose";

export interface IDeviceActivity {
  userId: string;
  platform: string;
  browser: string;
  ipAddress: string;
  createdAt: Date;
  lastActiveAt: Date;
}
