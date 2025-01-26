import TransactionsTable from "@/app/(management)/transactions/components/TransactionsTables";
import EmptyList from "@/components/common/EmptyList";
import { fetchTransactions } from "@/utils/actions";
import TransactionFilters from "./TransactionFilters";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";

async function TransactionList({
  dateTimeRange,
  search,
  customerId,
  status,
  categoryId,
}: {
  dateTimeRange:
    | { startDate: string | null; endDate: string | null }
    | undefined;
  search?: string;
  customerId?: string;
  status: string;
  categoryId: string;
}) {
  const {
    data: transactions,
    success,
    message,
  } = await fetchTransactions(dateTimeRange, search, customerId, status, categoryId);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="">
      <h1 className="mb-6 -mt-4 text-4xl text-center font-bold">معاملات</h1>
      <div className=" items-start w-full ">
        <Search />
        <TransactionFilters search={search} />
      </div>

      {transactions.length === 0 ? (
        <EmptyList />
      ) : (
        <>
          <TransactionsTable data={transactions} />
        </>
      )}
    </div>
  );
}

export default TransactionList;
