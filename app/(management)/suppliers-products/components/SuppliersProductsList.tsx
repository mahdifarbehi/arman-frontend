import SuppliersProductsTable from "./SuppliersProductsTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchSuppliersProducts } from "@/utils/actions";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";

async function SuppliersProductsList({ search }: { search: string }) {
  const {
    data: suppliersProducts,
    success,
    message,
  } = await fetchSuppliersProducts(search);
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">محصولات تامین کنندگان</h1>
      <Search />

      <SuppliersProductsTable data={suppliersProducts} />
    </div>
  );
}

export default SuppliersProductsList;
