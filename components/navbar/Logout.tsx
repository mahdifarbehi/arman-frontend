"use client";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa6";

function Logout() {
  const { toast } = useToast();
  const router = useRouter();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    const { success, message } = await logout();
    if (success) toast({ description: message });
    router.replace("/login");
  };
  return <FaPowerOff onClick={handleLogout} />;
}
export default Logout;
