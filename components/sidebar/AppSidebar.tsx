"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { links } from "@/utils/links";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function AppSidebar() {
  const isCollapsed = useSelector(
    (state: RootState) => state.store.isCollapsed
  );
  const path = usePathname();

  return (
    <TooltipProvider>
      <Sidebar
        className="w-64 border-l border-gray-200 bg-white"
        side="right"
        collapsible="icon"
      >
        <SidebarHeader />
        <SidebarContent>
          {links.map((category) => (
            <SidebarGroup key={category.title}>
              <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.children.map((link) => (
                    <SidebarMenuItem key={`${category.title}-${link.label}`}>
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={path === link.href}
                            >
                              <Link
                                href={link.href}
                                className="flex items-center space-x-2"
                              >
                                <link.icon className="text-xl" />
                              </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {link.label}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          isActive={path === link.href}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center space-x-2"
                          >
                            <link.icon className="text-xl" />
                            <span>{link.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </TooltipProvider>
  );
}
