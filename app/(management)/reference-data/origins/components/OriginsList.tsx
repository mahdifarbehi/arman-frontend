"use client";
import { useState, useEffect } from "react";
import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import OriginTable from "./OriginsTable";
import ModalContainer from "@/components/common/ModalContainer";
import OriginForm from "./OriginForm";
import { fetchCustomerOrigins } from "@/utils/actions";

function OriginList() {
  const [origins, setOrigins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchOrigins = async () => {
    setIsLoading(true);
    try {
      const { data, success, message } = await fetchCustomerOrigins();
      if (success) {
        setOrigins(data);
      } else {
        setErrorMessage(message || "خطایی رخ داده است.");
      }
    } catch (error) {
      setErrorMessage("خطا در برقراری ارتباط با سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrigins();
  }, []);

  const handleOriginSubmit = () => {
    fetchOrigins();
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (errorMessage) return <CustomErrorBoundary message={errorMessage} />;
  if (!origins.length) return <p>لیست مبداها خالی است.</p>;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        مبداهای مشتری
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-start items-center gap-4">
        <NewOriginForm handleOriginSubmit={handleOriginSubmit} />
      </div>
      <OriginTable data={origins} />
    </div>
  );
}

function NewOriginForm({
  handleOriginSubmit,
}: {
  handleOriginSubmit: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="مبدا جدید"
      buttonText="مبدا جدید"
      open={open}
      setOpen={setOpen}
    >
      <OriginForm setOpen={setOpen} onOriginSubmit={handleOriginSubmit} />
    </ModalContainer>
  );
}

export default OriginList;
