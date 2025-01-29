"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/utils/types";

function UsersFilters({ search }: { search?: string }) {
  const [role, setRole] = useState<string | null>(null);
  let filteredLink = "";

  const searchTerm = search ? `search=${search}` : "";
  const router = useRouter();

  const handleFilters = () => {
    filteredLink = `/users?${new URLSearchParams({
      ...(searchTerm ? { search } : {}),
      ...(role ? { role: role } : {}),
    }).toString()}`;
    router.push(filteredLink);
  };
  const handleResetFilters = () => {
    setRole(null);
    filteredLink = `/users?${searchTerm}`;
    router.push(filteredLink);
  };

  return (
    <div className="grid md:grid-cols-5 gap-4 mb-8">
      <div className="mb-2">
        <Label>نقش کاربر</Label>
        <Select
          dir="rtl"
          name="role"
          value={role}
          onValueChange={(value) => setRole(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="نقش کاربر را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(Role).map((role) => (
                <SelectItem key={role} value={role}>
                  {role === Role.ADMIN
                    ? "مدیر کل"
                    : role === Role.PAYMENT_MANAGER
                    ? "مدیر مالی"
                    : role === Role.PRODUCT_MANAGER
                    ? "مدیر محصول"
                    : role === Role.SALES_AGENT
                    ? "فروشنده"
                    : "مدیر فروش"}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 gap-4 flex">
        <Button className="w-32" onClick={handleFilters}>
          فیلتر
        </Button>
        <Button className="w-32" variant="outline" onClick={handleResetFilters}>
          حذف فیلتر
        </Button>
      </div>
    </div>
  );
}

export default UsersFilters;
