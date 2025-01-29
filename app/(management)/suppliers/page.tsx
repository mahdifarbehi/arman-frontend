import { Suspense } from "react";
import SuppliersList from "./components/SuppliersList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";

async function SuppliersPage(props: {
  searchParams: Promise<{
    search?: string;
    categoryId: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams.search || "";
  const categoryId = searchParams.categoryId || "";
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <SuppliersList search={searchTerm} categoryId={categoryId} />
      </Suspense>
    </section>
  );
}

export default SuppliersPage;
