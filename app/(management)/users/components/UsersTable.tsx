"use client";
import { useEffect, useState, memo } from "react";
import { useToast } from "@/hooks/use-toast";

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
import { categoriesData, categoriesSendData } from "@/utils/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(data.length);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {data.length !== 0 && currentItems.length !== 0 && (
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
            {currentItems.map((user) => (
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
      <div className="flex justify-center mt-4 mb-5">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronRight className="h-4 w-4" />
          صفحه قبل
        </Button>
        <div className="flex items-center mx-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          صفحه بعد
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
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

  const { toast } = useToast(); // دریافت تابع toast
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesUser, setCategoriesUser] = useState([]);

  const accessHandler = (user) => {
    if (user.categories) {
      const categoryIds = user.categories.map((item) => item.category.id);
      setCategoriesUser(categoryIds);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesData();
        if (data) setAllCategories(data);
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = ({ categoryId, checked }) => {
    setCategoriesUser((prevSelected) =>
      checked
        ? [...prevSelected, categoryId]
        : prevSelected.filter((id) => id !== categoryId)
    );
  };

  const handleSubmit = async () => {
    try {
      const data = {
        category_ids: categoriesUser,
        user_id: user.id,
      };

      const response = await categoriesSendData(data);

      toast({
        title: "موفقیت‌آمیز!",
        description: response.message,
      });

      window.location.reload();
    } catch (error) {
      console.error("خطا در بروزرسانی دسترسی‌ها:", error);

      toast({
        variant: "destructive",
        title: "خطا!",
        description: "خطا در بروزرسانی دسترسی‌ها",
      });
    }
  };

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
            <UserForm
              user={activeUser}
              edit
              setOpen={setOpen}
              onUserSubmit={() => {}}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => accessHandler(user)}
              variant="outline"
              size="sm"
            >
              دسترسی‌ها
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-row-reverse justify-between items-center">
              <DialogTitle>ویرایش دسترسی‌ها</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {allCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={categoriesUser.includes(category.id)} // چک می‌کنیم که آیا دسته‌بندی در دسته‌بندی‌های انتخاب‌شده است یا نه
                    onCheckedChange={(checked) =>
                      handleCheckboxChange({ categoryId: category.id, checked })
                    }
                  />
                  {category.title}
                </label>
              ))}
            </div>
            <Button onClick={handleSubmit} className="mt-4">
              ذخیره تغییرات
            </Button>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

const MemoizedUserRow = memo(UserRow);

export default UsersTable;
