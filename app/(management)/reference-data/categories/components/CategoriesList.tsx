"use client";
import { useState, useEffect } from "react";
import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import CategoryTable from "./CategoriesTable";
import ModalContainer from "@/components/common/ModalContainer";
import CategoryForm from "./CategoryForm";
import { fetchCategories } from "@/utils/actions";

function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategoriesData = async () => {
      setIsLoading(true);
      try {
        const { data, success, message } = await fetchCategories();
        if (success) {
          setCategories(data);
        } else {
          setMessage(message || "خطایی رخ داده است");
        }
      } catch (error) {
        setMessage("خطا در برقراری ارتباط با سرور");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!categories.length) return <CustomErrorBoundary message={message} />;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        دسته بندی ها
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-start items-center gap-4">
        <NewCategoryForm />
      </div>
      <CategoryTable data={categories} />
    </div>
  );
}

function NewCategoryForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="افزودن دسته بندی جدید"
      buttonText="افزودن دسته بندی جدید"
      open={open}
      setOpen={setOpen}
    >
      <CategoryForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default CategoryList;
