import PaymentsTable from "./PaymentsTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchPayments } from "@/utils/actions";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import PaymentsFilters from "./PaymentsFilters";

async function PaymentsList({
  search,
  categoryId,
  status,
}: {
  search?: string;
  categoryId: string;
  status: string;
}) {
  const {
    data: payments,
    success,
    message,
  } = await fetchPayments(search, status, categoryId);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">پرداخت ها</h1>
      <div className="flex flex-col justify-center items-start ">
        <Search />
        <PaymentsFilters search={search} />
      </div>
      {payments.length === 0 ? (
        <EmptyList />
      ) : (
        <PaymentsTable data={payments} />
      )}
    </div>
  );
}

export default PaymentsList;
