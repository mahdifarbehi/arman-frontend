"use client";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import Logout from "./Logout";
import UserIcon from "./UserIcon";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/storeSlice";
function Navbar({ SidebarTrigger }: { SidebarTrigger: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    setToken(tokenFromCookie || null);
  }, []);
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <nav className="border-b px-8">
      <div className="flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <div className="flex gap-4 items-center ">
          <Button size="icon" asChild onClick={handleSidebarToggle}>
            {SidebarTrigger}
          </Button>
          <DarkMode />
          <div className="border w-32 h-10 rounded-full flex gap-2 justify-between items-center px-2">
            {token && <Logout />}
            <UserIcon />
          </div>
        </div>
        {/* <NavSearch /> */}
        <Logo />
      </div>
    </nav>
  );
}
export default Navbar;
