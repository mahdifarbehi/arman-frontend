"use client";

import { useState, useEffect } from "react";
import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import TaskTable from "./TasksTable";
import ModalContainer from "@/components/common/ModalContainer";
import TaskForm from "./TaskForm";
import { fetchTasks } from "@/utils/actions";

function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchTaskData = async () => {
      setIsLoading(true);
      try {
        const { data, success, message } = await fetchTasks();
        if (success) {
          setTasks(data);
        } else {
          setErrorMessage(message || "خطایی رخ داده است.");
        }
      } catch (error) {
        setErrorMessage("خطا در برقراری ارتباط با سرور.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskData();
  }, []);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (errorMessage) return <CustomErrorBoundary message={errorMessage} />;
  if (!tasks.length) return <p>لیست فعالیت‌ها خالی است.</p>;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        فعالیت‌ها
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-start items-center gap-4">
        <NewTaskForm />
      </div>
      <TaskTable data={tasks} />
    </div>
  );
}

function NewTaskForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="فعالیت جدید"
      buttonText="فعالیت جدید"
      open={open}
      setOpen={setOpen}
    >
      <TaskForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default TaskList;
