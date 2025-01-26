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
import { X } from "lucide-react";
import { TaskStatus } from "@/utils/types";
import ModalContainer from "@/components/common/ModalContainer";
function TaskTable({
  data,
  onRevalidation,
  transactionId,
}: {
  data;
  onRevalidation;
  transactionId;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [activeTask, setActiveTask] = useState(null);
  const handleOpenDialog = (task) => {
    setActiveTask(task);
    setOpenEdit(true);
  };

  useEffect(() => {
    if (openEdit === false) setActiveTask(null);
  }, [openEdit, activeTask]);
  const tasks = data;

  return (
    <div className="border border-gray-200 rounded-xl ">
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
                  {/* <Button>ارسال پیامک</Button> */}
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
