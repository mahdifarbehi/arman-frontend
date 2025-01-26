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
import ModalContainer from "@/components/common/ModalContainer";
import UserForm from "./UserForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Role, type User } from "@/utils/types";
import { Checkbox } from "@/components/ui/checkbox";
import UserAssignmentForm from "./UserAssignmentForm";

function UsersTable({ data }: { data: User[] }) {
  const [open, setOpen] = useState(false);
  const [UserAssignmentFormOpen, setUserAssignmentFormOpen] = useState(false);
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
      <div className="m-16 flex justify-end items-center gap-4">
        <NewUserForm />
        <ModalContainer
          dialogTitle="واگذاری به مدیر"
          buttonText="واگذاری"
          open={UserAssignmentFormOpen}
          setOpen={setUserAssignmentFormOpen}
        >
          <UserAssignmentForm
            user_ids={[1, 2, 3]}
            setOpen={setUserAssignmentFormOpen}
          />
        </ModalContainer>
      </div>
      {data.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع کاربران : {data.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10rem] text-right">سمت</TableHead>
              <TableHead className="w-[8rem] text-right">
                نام و نام خانوادگی
              </TableHead>
              <TableHead className="w-[8rem] text-right">شماره تماس</TableHead>
              <TableHead className="w-[8rem] text-right">سرپرست</TableHead>
              <TableHead className="w-[8rem] text-right">
                تارگت ماهیانه
              </TableHead>
              <TableHead className="w-[8rem] text-right">واگذاری</TableHead>
              <TableHead className="w-[15rem] text-right">عملیات</TableHead>
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
      <TableCell className="w-[10rem] text-right">
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
      <TableCell className="w-[8rem] text-right">{fullname}</TableCell>
      <TableCell className="w-[8rem] text-right">{phone}</TableCell>
      <TableCell className="w-[8rem] text-right">
        {leader_user?.fullname}
      </TableCell>
      <TableCell className="w-[8rem] text-right">{monthly_target}</TableCell>
      <TableCell className="w-[8rem] text-right">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(e) => handleAssignments(UserId, Boolean(e))}
        />
      </TableCell>
      <TableCell className="w-[15rem] text-right flex gap-2">
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

function NewUserForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="کاربر جدید"
      buttonText="کاربر جدید"
      open={open}
      setOpen={setOpen}
    >
      <UserForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default UsersTable;
