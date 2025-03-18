import { IUser } from "../modules/user/user.interface";
import { redis } from "../redis";

export const storeSession = async (user: IUser) => {
  if (!user) {
    throw new Error("Invalid user object for session storage");
  }

  await redis.set(
    user._id.toString(),
    JSON.stringify({
      userId: user._id,
      email: user.email,
      role: user.role,
    }),
    "EX",
    60 * 60 * 24 // 1 day expiration
  );
};
