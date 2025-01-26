import CustomersList from "@/app/(management)/customers/components/CustomersList";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";

async function CustomersPage(props: {
  searchParams: Promise<{
    search?: string;
    originId: string;
    categoryId: string;
    status: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams.search || "";
  const categoryId = searchParams.categoryId || "";
  const status = searchParams.status || "";
  const originId = searchParams.originId || "";
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <CustomersList
          search={searchTerm}
          categoryId={categoryId}
          status={status}
          originId={originId}
        />
      </Suspense>
    </section>
  );
}

export default CustomersPage;
