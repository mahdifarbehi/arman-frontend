import { Suspense } from "react";
import SuppliersProductsList from "./components/SuppliersProductsList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function ProductsPage(props: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams.search || "";
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <SuppliersProductsList search={searchTerm} />
      </Suspense>
    </section>
  );
}

export default ProductsPage;
