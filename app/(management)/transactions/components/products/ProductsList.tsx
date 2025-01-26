"use client";
import { fetchTransactionProducts } from "@/utils/actions";
import { useEffect, useState } from "react";
import ProductsTable from "@/app/(management)/transactions/components/products//ProductsTable";

function ProductsList({ transactionId }: { transactionId: number }) {
    const [revalidation, setRevalidation] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactionProducts(transactionId);
      setProducts(data);
        setRevalidation(false);
    };
    if (transactionId) fetchData();
  }, [transactionId, revalidation]);

  const handleRevalidation = () => {
    setRevalidation(true);
  };

  return (
    <div className="mt-16 w-full flex justify-center items-center ">
      <ProductsTable data={products} onRevalidation={handleRevalidation} transactionId={transactionId}/>
    </div>
  );
}

export default ProductsList;
