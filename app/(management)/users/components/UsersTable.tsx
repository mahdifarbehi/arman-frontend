"use client";
import { useEffect, useState, memo } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserForm from "./UserForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Role, type User } from "@/utils/types";
import { Checkbox } from "@/components/ui/checkbox";

function UsersTable({ data }: { data: User[] }) {
  const [open, setOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  const [userIds, setUserIds] = useState<number[]>([]);

  const handleOpenDialog = (user: User) => {
    setActiveUser(user);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) setActiveUser(undefined);
  }, [open]);

  const handleAssignments = (userId: number, state: boolean) => {
    setUserIds((prevUserIds) => {
      if (state) {
        return prevUserIds.includes(userId)
          ? prevUserIds
          : [...prevUserIds, userId];
      } else {
        return prevUserIds.filter((id) => id !== userId);
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl">

      {data.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع کاربران : {data.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">سمت</TableHead>
              <TableHead className="text-center">نام و نام خانوادگی</TableHead>
              <TableHead className="text-center">شماره تماس</TableHead>
              <TableHead className="text-center">سرپرست</TableHead>
              <TableHead className="text-center">تارگت ماهیانه</TableHead>
              <TableHead className="text-center">واگذاری</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <MemoizedUserRow
                key={user.id}
                user={user}
                isChecked={userIds.includes(user.id)}
                handleAssignments={handleAssignments}
                handleOpenDialog={handleOpenDialog}
                open={open}
                setOpen={setOpen}
                activeUser={activeUser}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

const UserRow = ({
  user,
  isChecked,
  handleAssignments,
  handleOpenDialog,
  open,
  setOpen,
  activeUser,
}: {
  user: User;
  isChecked: boolean;
  handleAssignments: (userId: number, state: boolean) => void;
  handleOpenDialog: (user: User) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeUser: User | undefined;
}) => {
  const {
    id: UserId,
    phone,
    role,
    leader_user,
    fullname,
    monthly_target,
  } = user;

  return (
    <TableRow>
      <TableCell className="text-center">
        {role === Role.ADMIN
          ? "مدیر کل"
          : role === Role.PAYMENT_MANAGER
          ? "مدیر مالی"
          : role === Role.PRODUCT_MANAGER
          ? "مدیر محصول"
          : role === Role.SALES_AGENT
          ? "فروشنده"
          : "مدیر فروش"}
      </TableCell>
      <TableCell className="text-center">{fullname}</TableCell>
      <TableCell className="text-center">{phone}</TableCell>
      <TableCell className="text-center">{leader_user?.fullname}</TableCell>
      <TableCell className="text-center">{monthly_target}</TableCell>
      <TableCell className="text-center">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(e) => handleAssignments(UserId, Boolean(e))}
        />
      </TableCell>
      <TableCell className="text-center flex justify-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog(user)} size="sm">
              ویرایش
            </Button>
          </DialogTrigger>
          <DialogContent
            className="[&>button]:hidden w-dialog"
            aria-describedby={undefined}
          >
            <DialogHeader className="flex flex-row-reverse justify-between items-center">
              <button
                onClick={() => setOpen(false)}
                className="p-2"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <DialogTitle>ویرایش کاربر</DialogTitle>
            </DialogHeader>
            <UserForm user={activeUser} edit setOpen={setOpen} />
          </DialogContent>
        </Dialog>
        <Button variant={"outline"} size={"sm"}>
          دسترسی ها
        </Button>
      </TableCell>
    </TableRow>
  );
};

const MemoizedUserRow = memo(UserRow);


export default UsersTable;
