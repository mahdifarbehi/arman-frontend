import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import TaskTable from "./TasksTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchTasks } from "@/utils/actions";

async function TaskList() {
  const { data: tasks, success, message } = await fetchTasks();
  if (!success) return <CustomErrorBoundary message={message} />

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">فعالیت ها </h1>

        <TaskTable data={tasks} />
     
    </div>
  );
}

export default TaskList;
