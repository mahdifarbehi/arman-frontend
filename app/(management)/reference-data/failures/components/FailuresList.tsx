"use client";
import { useState, useEffect } from "react";
import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import FailureTable from "./FailuresTable";
import ModalContainer from "@/components/common/ModalContainer";
import FailureForm from "./FailureForm";
import { fetchFailures } from "@/utils/actions";

function FailureList() {
  const [failures, setFailures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchFailureData = async () => {
      setIsLoading(true);
      try {
        const { data, success, message } = await fetchFailures();
        if (success) {
          setFailures(data);
        } else {
          setErrorMessage(message || "خطایی رخ داده است.");
        }
      } catch (error) {
        setErrorMessage("خطا در برقراری ارتباط با سرور.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFailureData();
  }, []);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (errorMessage) return <CustomErrorBoundary message={errorMessage} />;
  if (!failures.length) return <p>لیست دلایل شکست خالی است.</p>;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        دلایل شکست
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-start items-center gap-4">
        <NewFailureForm />
      </div>
      <FailureTable data={failures} />
    </div>
  );
}

function NewFailureForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="دلایل شکست جدید"
      buttonText="دلایل شکست جدید"
      open={open}
      setOpen={setOpen}
    >
      <FailureForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default FailureList;
