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
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        پرداخت ها
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="flex justify-center items-center ">
        <PaymentsFilters search={search} />
        <Search />
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
