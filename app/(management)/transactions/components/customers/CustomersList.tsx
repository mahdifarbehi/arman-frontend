"use client";
import { fetchTransactionCustomers } from "@/utils/actions";
import CustomersTable from "@/app/(management)/transactions/components/customers/CustomersTable";
import { useEffect, useState } from "react";

function CustomersList({ transactionId }: { transactionId: number }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactionCustomers(transactionId);
      setCustomers(data);
    };
    if (transactionId) fetchData();
  }, [transactionId]);

  return (
    <div className="mt-16 w-full flex justify-center items-center ">
      <CustomersTable data={customers} />
    </div>
  );
}

export default CustomersList;
