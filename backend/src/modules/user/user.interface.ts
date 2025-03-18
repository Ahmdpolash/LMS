import { Model } from "mongoose";

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  isDeleted: boolean;
  status: "active" | "blocked";
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
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
