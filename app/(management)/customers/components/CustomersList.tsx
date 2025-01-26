import CustomersTable from "./CustomersTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchCustomers } from "@/utils/actions";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import CustomersFilters from "./CustomersFilters";

async function CustomersList({
  search,
  originId,
  categoryId,
  status,
}: {
  search?: string;
  categoryId: string;
  status: string;
  originId: string;
}) {
  const {
    data: customers,
    success,
    message,
  } = await fetchCustomers(search, status, categoryId, originId);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">مشتریان</h1>
      <div className="flex flex-col justify-center items-start ">
        <Search />
        <CustomersFilters search={search} />
      </div>

      <CustomersTable data={customers} />
    </div>
  );
}

export default CustomersList;
