import { Suspense } from "react";
import TransactionList from "./components/TransactionList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";

async function TransactionsPage(props: {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
    search?: string;
    customerId?: string;
    categoryId?: string;
    status: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const dateTimeRange = {
    startDate: searchParams?.startDate || "",
    endDate: searchParams?.endDate || "",
  };
  const searchTerm = searchParams.search || "";
  const customerId = searchParams.customerId || "";

  const status = searchParams.status || "";
  const categoryId = searchParams.categoryId || "";
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <TransactionList
          dateTimeRange={dateTimeRange}
          search={searchTerm}
          customerId={customerId}
          status={status}
          categoryId={categoryId}
        />
      </Suspense>
    </section>
  );
}

export default TransactionsPage;
