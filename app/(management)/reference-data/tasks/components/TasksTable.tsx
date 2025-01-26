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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalContainer from "@/components/common/ModalContainer";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { TaskType } from "@/utils/types";
import { deleteTaskAction } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";

function TasksTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<TaskType | undefined>(undefined);
  const handleOpenDialog = (task: TaskType) => {
    setActiveTask(task);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    const result = await deleteTaskAction(id);
    if (result.message) toast({ description: result.message });
  };
  useEffect(() => {
    if (open === false) setActiveTask(undefined);
  }, [open, activeTask]);

  const tasks = data;
  return (
    <div className="border border-gray-200 rounded-xl ">
      <div className="m-8 flex justify-end items-center gap-4">
        <NewTaskForm />
      </div>
      {tasks.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع فعالیت ها : {tasks.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8rem] text-right">عنوان</TableHead>
              <TableHead className="w-[8rem] text-right"> توضیحات </TableHead>
              <TableHead className="w-[15rem] text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: TaskType) => {
              const { id: taskId, title, description } = task;
              return (
                <TableRow key={taskId}>
                  <TableCell className="w-[10rem] text-right">
                    {title}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {description}
                  </TableCell>
                  <TableCell className="w-[15rem] text-right flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(task)}
                          size="sm"
                        >
                          ویرایش
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="[&>button]:hidden"
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
                          <DialogTitle>ویرایش فعالیت</DialogTitle>
                        </DialogHeader>

                        <TaskForm task={activeTask} edit setOpen={setOpen} />
                      </DialogContent>
                    </Dialog>
                    <Button size={"sm"} onClick={() => handleDelete(taskId)}>
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

function NewTaskForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle=" فعالیت جدید"
      buttonText=" فعالیت جدید"
      open={open}
      setOpen={setOpen}
    >
      <TaskForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default TasksTable;
