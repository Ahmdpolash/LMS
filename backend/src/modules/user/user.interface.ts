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



export interface UserModel extends Model<IUser> {
  isPasswordMathced(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isUserExistsByCustomId(id: string): Promise<IUser>;
  isUserExistsByEmail(email: string): Promise<IUser>;
}
