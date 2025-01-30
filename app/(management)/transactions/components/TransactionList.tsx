import TransactionsTable from "@/app/(management)/transactions/components/TransactionsTables";
import EmptyList from "@/components/common/EmptyList";
import { fetchTransactions } from "@/utils/actions";
import TransactionFilters from "./TransactionFilters";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";

async function TransactionList({
  search,
  customerId,
  status,
  categoryId,
  date,
}: {
  search?: string;
  customerId?: string;
  status: string;
  categoryId: string;
  date: string;
}) {
  const {
    data: transactions,
    success,
    message,
  } = await fetchTransactions(search, customerId, status, categoryId, date);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        لیست معاملات
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="flex justify-between items-center w-full ">
        <TransactionFilters search={search} />
        <Search />
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
