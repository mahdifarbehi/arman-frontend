import { Suspense } from "react";
import CategoriesList from "./components/CategoriesList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function CategoriesReferencePage() {
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <CategoriesList />
      </Suspense>
    </section>
  );
}

export default CategoriesReferencePage;
