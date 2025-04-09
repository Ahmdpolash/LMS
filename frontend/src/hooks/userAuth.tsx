import { useAppSelector } from "@/redux/hooks";

export default function UserAuth() {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return true;
  } else {
      return false
  }
}
