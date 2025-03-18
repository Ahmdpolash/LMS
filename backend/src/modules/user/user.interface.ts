import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: "admin" | "user" | "admin";

  isVerified: boolean;
  isDeleted: boolean;
  status: "active" | "blocked";
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
