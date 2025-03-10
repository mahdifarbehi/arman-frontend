"use client";
import { useEffect, useState } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TaskForm from "@/app/(management)/transactions/components/tasks/TaskForm";
import { Button } from "@/components/ui/button";
import { isoToPersian } from "@/utils/dateConvertor";
import { TaskStatus } from "@/utils/types";
import ModalContainer from "@/components/common/ModalContainer";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
function TaskTable({
  data,
  onRevalidation,
  transactionId,
}: {
  data;
  onRevalidation;
  transactionId;
}) {
  interface Task {
    id: string;
    task_type: {
      title: string;
    };
    task_date: string;
    finish_data?: string;
    status: TaskStatus;
    description: string;
  }
  interface TaskTableProps {
    data: Task[];
    onRevalidation: () => void;
    transactionId: string;
  }

  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [activeTask, setActiveTask] = useState(null);
  const handleOpenDialog = (task: Task) => {
    setActiveTask(task);
    setOpenEdit(true);
  };

  useEffect(() => {
    if (openEdit === false) setActiveTask(null);
  }, [openEdit, activeTask]);
  const tasks = data;

  const handleSendMessage = async (task: Task) => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        toast({ description: "توکن احراز هویت یافت نشد." });
        return;
      }
      // console.log("Authorization Header:", `Bearer ${authToken}`);

      const requestBody = {
        date: task.task_date,
      };
      // console.log("Request Body:", requestBody);

      const response = await axios.post(
        `https://arman-crm.darkube.app/api/transaction-utils/task-messaging/${task.id}`,
        requestBody,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      // console.log(response);
      toast({ description: "پیام با موفقیت ارسال شد." });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast({ description: "مجوز کافی برای ارسال درخواست وجود ندارد." });
        } else if (error.response && error.response.status === 422) {
          toast({
            description:
              "خطا در اعتبارسنجی داده‌ها. لطفا فرمت تاریخ را بررسی کنید.",
          });
          console.log("Validation Error:", error.response.data);
        } else {
          toast({ description: `خطا در ارسال پیام: ${error.message}` });
        }
      } else {
        toast({ description: "خطا در ارسال پیام. لطفا دوباره تلاش کنید." });
      }
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="m-16 flex justify-end items-center gap-4">
        <ModalContainer
          dialogTitle="فعالیت جدید"
          buttonText="فعالیت جدید"
          open={openNew}
          setOpen={setOpenNew}
        >
          <TaskForm
            setOpen={setOpenNew}
            revalidation={onRevalidation}
            transactionId={transactionId}
          />
        </ModalContainer>
      </div>
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10rem] text-right">عنوان</TableHead>
            <TableHead className="w-[12rem] text-right">تاریخ</TableHead>
            <TableHead className="w-[12rem] text-right">تاریخ نتیجه</TableHead>
            <TableHead className="w-[6rem] text-right">وضعیت</TableHead>
            <TableHead className="w-[15rem] text-right">توضیحات</TableHead>
            <TableHead className="w-[15rem] text-right">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task) => {
            const {
              id: taskId,
              task_type: { title },
              task_date,
              finish_data,
              status,
              description,
            } = task;
            return (
              <TableRow key={taskId}>
                <TableCell className="w-[10rem] text-right">{title}</TableCell>
                <TableCell className="w-[12rem] text-right">
                  {isoToPersian(task_date)?.toString()}
                </TableCell>
                <TableCell className="w-[12rem] text-right">
                  {finish_data ? isoToPersian(finish_data)?.toString() : ""}
                </TableCell>
                <TableCell className="w-[6rem] text-right">
                  {status === TaskStatus.COMPLETED
                    ? "موفق"
                    : status === TaskStatus.FAILED
                    ? "ناموفق"
                    : "جدید"}
                </TableCell>
                <TableCell className="w-[15rem] text-right">
                  {description}
                </TableCell>
                <TableCell className="w-[15rem] text-right flex gap-2">
                  <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleOpenDialog(task)}
                        variant="outline"
                        size="sm"
                      >
                        ویرایش
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="[&>button]:hidden"
                      aria-describedby={undefined}
                      aria-hidden={false}
                    >
                      <DialogHeader className="flex flex-row-reverse justify-between items-center">
                        <button
                          onClick={() => setOpenEdit(false)}
                          className="p-2"
                          aria-label="Close"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <DialogTitle>ویرایش فعالیت</DialogTitle>
                      </DialogHeader>
                      <TaskForm
                        task={activeTask}
                        setOpen={setOpenEdit}
                        revalidation={onRevalidation}
                        transactionId={transactionId}
                      />
                    </DialogContent>
                  </Dialog>
                  {/* <Button
                    onClick={() => handleSendMessage(task)}
                    variant="outline"
                    size="sm"
                  >
                    ارسال پیام
                  </Button> */}
                  <Button
                    onClick={() => handleSendMessage(task)}
                    variant="outline"
                    size="sm"
                  >
                    ارسال پیام
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default TaskTable;
