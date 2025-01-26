"use client";
import { fetchTransactionPayments } from "@/utils/actions";
import { useEffect, useState } from "react";
import PaymentsTable from "@/app/(management)/transactions/components/payments//PaymentsTable";

function PaymentsList({ transactionId }: { transactionId: number }) {
  const [revalidation, setRevalidation] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactionPayments(transactionId);
      setPayments(data);
      setRevalidation(false);
    };
    if (transactionId) fetchData();
  }, [transactionId, revalidation]);

  const handleRevalidation = () => {
    setRevalidation(true);
  };

  return (
    <div className="mt-16 w-full flex justify-center items-center ">
      <PaymentsTable
        data={payments}
        onRevalidation={handleRevalidation}
        transactionId={transactionId}
      />
    </div>
  );
}

export default PaymentsList;
