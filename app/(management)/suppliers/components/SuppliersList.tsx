
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
    <div className="">
      <h1 className="mb-6 -mt-4 text-4xl text-center font-bold">
        تامین کنندگان
      </h1>
      <div className="flex w-full items-center gap-6 mb-6 ">
        <div className="flex items-center gap-6">
        <Search />
        <SuppliersFilters search={search} />
        </div>
        <div className="mt-6 mr-10">
        <NewSupplierForm />
        </div>
      </div>

      <SuppliersTable data={suppliers} />
    </div>
  );
}


export default SuppliersList;
