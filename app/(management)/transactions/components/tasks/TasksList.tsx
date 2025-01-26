"use client";
import { fetchTransactionTasks } from "@/utils/actions";
import TaskTable from "@/app/(management)/transactions/components/tasks/TaskTable";
import { useEffect, useState } from "react";

function TasksList({ transactionId }: { transactionId: number }) {
  const [revalidation, setRevalidation] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactionTasks(transactionId);
      setTasks(data);
      setRevalidation(false);
    };
    if (transactionId || revalidation) fetchData();
  }, [transactionId, revalidation]);

  const handleRevalidation = () => {
    setRevalidation(true);
  };
  return (
    <div className="mt-16 w-full flex justify-center items-center ">
      <TaskTable
        data={tasks}
        onRevalidation={handleRevalidation}
        transactionId={transactionId}
      />
    </div>
  );
}

export default TasksList;
