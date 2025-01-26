import { LuUser } from "react-icons/lu";
import profileImage from "@/public/profile.jpg";
import Image from "next/image";

function UserIcon() {
  const isLoggedIn = true;
  return isLoggedIn ? (
    <Image
      src={profileImage}
      alt="profile image"
      className="rounded-full bg-cover w-auto h-auto"
      width={24}
      height={24}
    />
  ) : (
    <LuUser className="w-6 h-6 bg-primary rounded-full border text-white" />
  );
}

export default UserIcon;
