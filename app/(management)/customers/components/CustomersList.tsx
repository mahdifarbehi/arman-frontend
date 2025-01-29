"use client";

import CustomersTable from "./CustomersTable";
import EmptyList from "@/components/common/EmptyList";
import { fetchCustomers } from "@/utils/actions";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import CustomersFilters from "./CustomersFilters";
import FilesForm from "./FilesForm";
import ModalContainer from "@/components/common/ModalContainer";
import CustomerAssignmentForm from "./CustomerAssignmentForm";
import { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";

function CustomersList({
  search,
  originId,
  categoryId,
  status,
}: {
  search?: string;
  categoryId: string;
  status: string;
  originId: string;
}) {
  const [customers, setCustomers] = useState([]);
  const [customerIds, setCustomerIds] = useState<number[]>([]);
  const [formsState, setFormsState] = useState({
    openFile: false,
    assignmentFormOpen: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleForm = (formName: string, state: boolean) => {
    setFormsState((prev) => ({ ...prev, [formName]: state }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, success, message } = await fetchCustomers(
          search,
          status,
          categoryId,
          originId
        );
        if (success) {
          setCustomers(data);
        } else {
          setError(message);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, status, categoryId, originId]);

  if (loading) {
    return <div>درحال بارگذاری ...</div>;
  }

  if (error) {
    return <CustomErrorBoundary message={error} />;
  }

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        مشتریان
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="flex justify-start items-center gap-4 mb-6">
        <NewCustomerForm />
        <ModalContainer
          buttonText="دریافت از اکسل"
          dialogTitle="دریافت فایل"
          open={formsState.openFile}
          setOpen={(state) => toggleForm("openFile", state)}
        >
          <FilesForm />
        </ModalContainer>
        <ModalContainer
          dialogTitle="واگذاری به فروشنده"
          buttonText="واگذاری"
          open={formsState.assignmentFormOpen}
          setOpen={(state) => toggleForm("assignmentFormOpen", state)}
        >
          <CustomerAssignmentForm
            customerIds={customerIds}
            setOpen={(state) => toggleForm("assignmentFormOpen", state)}
          />
        </ModalContainer>
      </div>
      <div className="flex justify-between items-center mb-6">
        <CustomersFilters search={search} />
        <Search />
      </div>

      <CustomersTable data={customers} />
    </div>
  );
}

function NewCustomerForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="مشتری جدید"
      buttonText="مشتری جدید"
      open={open}
      setOpen={setOpen}
    >
      <CustomerForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default CustomersList;
