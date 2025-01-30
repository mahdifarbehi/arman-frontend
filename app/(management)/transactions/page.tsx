import { Suspense } from "react";
import TransactionList from "./components/TransactionList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";

async function TransactionsPage(props: {
  searchParams: Promise<{
    search?: string;
    customerId?: string;
    categoryId?: string;
    status: string;
    date: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const searchTerm = searchParams.search || "";
  const customerId = searchParams.customerId || "";

  const status = searchParams.status || "";
  const date = searchParams.date || "";
  const categoryId = searchParams.categoryId || "";
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <TransactionList
          date={date}
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
