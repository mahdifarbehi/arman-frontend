import { fetchSuppliers } from "@/utils/actions";
import SuppliersTable from "./SuppliersTable";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import SuppliersFilters from "./SuppliersFilters";
import NewSupplierForm from "./NewSupplierForm";

async function SuppliersList({
  search,
  categoryId,
}: {
  search: string;
  categoryId: string;
}) {
  const {
    data: suppliers,
    success,
    message,
  } = await fetchSuppliers(search, categoryId);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        لیست تامین کنندگان
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="flex justify-between items-center w-full mb-6">
        <div className="flex items-center gap-6">
          <SuppliersFilters search={search} />
        </div>
        <div className="flex">
          <NewSupplierForm />
          <Search />
        </div>
      </div>

      <SuppliersTable data={suppliers} />
    </div>
  );
}

export default SuppliersList;
