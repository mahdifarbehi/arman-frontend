import type { Metadata } from "next";
import "@/app/globals.css";
import "@/assets/fonts/font.css";
import Navbar from "@/components/navbar/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main className=" w-full flex  ">
        <AppSidebar />
        <div className="w-full">
          <Navbar SidebarTrigger={<SidebarTrigger />} />
          <div className="p-8">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
