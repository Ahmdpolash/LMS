import { Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
};

export type IActivteUser = {
  activation_token: string;
  activation_code: string;
};

export interface UserModel extends Model<IUser> {
  isPasswordMathced(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isUserExistsByCustomId(id: string): Promise<IUser>;
  isUserExistsByEmail(email: string): Promise<IUser>;
}
