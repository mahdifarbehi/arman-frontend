import { Suspense } from "react";
import PaymentsList from "./components/PaymentsList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";

async function PaymentsPage(props: {
  searchParams: Promise<{
    search?: string;
    categoryId: string;
    status: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams.search || "";
  const categoryId = searchParams.categoryId || "";
  const status = searchParams.status || "";
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <PaymentsList
          status={status}
          categoryId={categoryId}
          search={searchTerm}
        />
      </Suspense>
    </section>
  );
}

export default PaymentsPage;
