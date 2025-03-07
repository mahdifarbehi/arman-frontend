"use client";

import { useState, useEffect } from "react";
import CustomErrorBoundary from "@/app/(management)/CustomErrorBoundary";
import ProductsTable from "./ProductsTable";
import ModalContainer from "@/components/common/ModalContainer";
import ProductForm from "./ProductForm";
import { fetchProducts } from "@/utils/actions";

function ProductsList() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const { data, success, message } = await fetchProducts();
      if (success) {
        setProducts(data);
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
    fetchProductData();
  }, []);

  const handleProductSubmit = () => {
    fetchProductData();
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (errorMessage) return <CustomErrorBoundary message={errorMessage} />;
  if (!products.length) return <p>لیست محصولات خالی است.</p>;

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        محصولات
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-start items-center gap-4">
        <NewProductForm handleProductSubmit={handleProductSubmit} />
      </div>
      <ProductsTable data={products} />
    </div>
  );
}

function NewProductForm({
  handleProductSubmit,
}: {
  handleProductSubmit: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="افزودن محصول جدید"
      buttonText="افزودن محصول جدید"
      open={open}
      setOpen={setOpen}
    >
      <ProductForm setOpen={setOpen} onProductSubmit={handleProductSubmit} />
    </ModalContainer>
  );
}

export default ProductsList;
