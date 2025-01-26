import { Suspense } from "react";
import FailuresList from "./components/FailuresList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function FailuresReferencePage() {
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <FailuresList />
      </Suspense>
    </section>
  );
}

export default FailuresReferencePage;
