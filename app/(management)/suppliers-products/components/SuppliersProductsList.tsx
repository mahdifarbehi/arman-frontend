"use client";

import SuppliersProductsTable from "./SuppliersProductsTable";
import { fetchSuppliersProducts } from "@/utils/actions";
import Search from "@/components/common/Search";
import CustomErrorBoundary from "../../CustomErrorBoundary";
import ModalContainer from "@/components/common/ModalContainer";
import SupplierProductForm from "./SupplierProductForm";
import { useState, useEffect } from "react";

function SuppliersProductsList({ search }: { search: string }) {
  const [suppliersProducts, setSuppliersProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, success, message } = await fetchSuppliersProducts(search);
        if (success) {
          setSuppliersProducts(data);
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
  }, [search]);

  if (loading) {
    return <div>لودینگ ...</div>;
  }

  if (error) {
    return <CustomErrorBoundary message={error} />;
  }

  return (
    <div>
      <h1 className="mb-3 mt-4 text-4xl font-extrabold text-gray-700 dark:text-white">
        محصولات تامین کنندگان
      </h1>
      <div className="border border-indigo-600 mb-6"></div>
      <div className="my-8 flex justify-between items-center">
        <NewSupplierProductForm />
        <Search />
      </div>
      <SuppliersProductsTable data={suppliersProducts} />
    </div>
  );
}

function NewSupplierProductForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="افزودن محصول جدید"
      buttonText="افزودن محصول جدید"
      open={open}
      setOpen={setOpen}
    >
      <SupplierProductForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default SuppliersProductsList;
