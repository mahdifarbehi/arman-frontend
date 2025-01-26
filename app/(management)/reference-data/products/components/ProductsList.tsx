import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import ProductsTable from "./ProductsTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchProducts } from "@/utils/actions";

async function ProductsList() {
  const { data: products, success, message } = await fetchProducts();
  if (!success) return <CustomErrorBoundary message={message} />;

  return (
    <div className="mt-10">
      <h1 className="mb-8 text-4xl font-bold">محصولات </h1>

      <ProductsTable data={products} />
    </div>
  );
}

export default ProductsList;
