import { Suspense } from "react";
import ProductsList from "./components/ProductsList";
import { TableSkeleton } from "@/components/common/TableSkeleton";
export const dynamic = "force-dynamic";


async function ProductsPage() {
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <ProductsList />
      </Suspense>
    </section>
  );
}

export default ProductsPage;
