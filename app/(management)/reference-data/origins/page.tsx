import { Suspense } from "react";
import OriginsList from "./components/OriginsList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function OriginReferencePage() {
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <OriginsList />
      </Suspense>
    </section>
  );
}

export default OriginReferencePage;
