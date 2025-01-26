import { Suspense } from "react";
import TasksList from "./components/TasksList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function TaskReferencePage() {
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <TasksList />
      </Suspense>
    </section>
  );
}

export default TaskReferencePage;
