"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TransactionForm from "../components/TransactionForm";
import { fetchCustomer, fetchTransaction } from "@/utils/actions";
import { useEffect, useState, lazy, Suspense } from "react";
import { setError } from "@/store/storeSlice";
import { Customer, Transaction } from "@/utils/types";
import { useDispatch } from "react-redux";
import NotFound from "./not-found";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
// Lazy-loaded components
const PaymentsList = lazy(() => import("../components/payments/PaymentsList"));
const TasksList = lazy(() => import("../components/tasks/TasksList"));
const ProductsList = lazy(() => import("../components/products/ProductsList"));
const CustomersList = lazy(
  () => import("../components/customers/CustomersList")
);

export const dynamic = "force-dynamic";

function TransactionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const transactionId = params.transactionId as string;
  const customerId = searchParams.get("customerId") as string;
  const [transaction, setTransaction] = useState<Transaction>(null);
  const [customer, setCustomer] = useState<Customer>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [editMode, setEditMode] = useState(null);
  useEffect(() => {
    if (transactionId === "new" && !!Number(customerId)) {
      setEditMode(false);
    } else if (!isNaN(Number(transactionId))) {
      setEditMode(true);
    } else {
      dispatch(setError(`معامله ای با آیدی ${transactionId} یافت نشد`));
      setNotFoundError(true);
    }
  }, [transactionId, customerId, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!editMode) {
          // Fetch customer data if in "new customer transaction" mode
          const { data, success } = await fetchCustomer(+customerId);
          if (!success) {
            dispatch(setError(`مشتری ای با آیدی ${customerId} یافت نشد`));
            setNotFoundError(true);
            return;
          }
          setCustomer(data);
        } else if (editMode) {
          // Fetch transaction and customer data if in "edit" mode
          const { data: transactionData, success: transactionSuccess } =
            await fetchTransaction(+transactionId);
          if (!transactionSuccess) {
            dispatch(setError(`معامله ای با آیدی ${transactionId} یافت نشد`));
            setNotFoundError(true);
            return;
          }
          setTransaction(transactionData);

          // Fetch the associated customer if available
          if (transactionData.customer.id) {
            const { data: customerData, success: customerSuccess } =
              await fetchCustomer(transactionData.customer.id);
            if (!customerSuccess) {
              dispatch(
                setError(
                  `مشتری ای با آیدی ${transactionData.customerId} یافت نشد`
                )
              );
              setNotFoundError(true);
              return;
            }
            setCustomer(customerData);
          }
        } else {
          // Invalid state (transactionId is "new" without customerId)
          setNotFoundError(true);
          dispatch(setError(`لطفاً یک آیدی مشتری معتبر وارد کنید`));
        }
      } finally {
        setLoading(false);
      }
    };
    if (editMode !== null) fetchData();
  }, [transactionId, customerId, editMode, dispatch]);
  const handleFormSubmit = (data: Transaction) => {
    if (!editMode) router.replace(`/transactions/${data.id}`);
  };
  if (notFoundError) return <NotFound />;
  if (loading) return <TableSkeleton />;

  return (
    <div className="flex flex-row gap-8 ">
      <div className="w-[32rem]">
        <TransactionForm
          transaction={transaction}
          customerId={
            customerId ? customerId : transaction.customer.id.toString()
          }
          editMode={editMode}
          onFormSubmit={handleFormSubmit}
        />
      </div>
      <Tabs
        defaultValue=""
        className="w-full border border-gray-200 p-4 rounded-xl flex flex-col justify-start items-center"
      >
        <TabsList className="w-128">
          <TabsTrigger value="payment" className="w-32" disabled={!editMode}>
            پرداخت
          </TabsTrigger>
          <TabsTrigger value="task" className="w-32" disabled={!editMode}>
            فعالیت
          </TabsTrigger>
          <TabsTrigger value="product" className="w-32" disabled={!editMode}>
            محصولات
          </TabsTrigger>
          <TabsTrigger value="customer" className="w-32" disabled={!editMode}>
            مشتری
          </TabsTrigger>
        </TabsList>
        <TabsContent value="payment" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <PaymentsList transactionId={transaction?.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="task" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <TasksList transactionId={transaction?.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="product" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <ProductsList transactionId={transaction?.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="customer" className="w-full">
          <Suspense fallback={<TableSkeleton />}>
            <CustomersList transactionId={transaction?.id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TransactionPage;
