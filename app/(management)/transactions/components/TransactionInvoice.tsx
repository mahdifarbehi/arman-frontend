"use client";

import React, { useState, useEffect } from "react";
import { fetchTransactionInvoice } from "@/utils/actions";

interface Product {
  id: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total_price: number;
}

interface Invoice {
  id: number;
  date: string;
  customer: string;
  phone: string;
  total_without_discount: number;
  total_discount: number;
  total: number;
  products: Product[];
}

const InvoiceComponent = ({ transactionId }: { transactionId: number }) => {
  const [revalidation, setRevalidation] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchTransactionInvoice(transactionId);
      setInvoiceData(data);
      setRevalidation(false);
    };
    if (transactionId || revalidation) fetchData();
  }, [transactionId, revalidation]);

  const handleRevalidation = () => {
    setRevalidation(true);
  };
  if (!invoiceData) {
    return <p dir="rtl">در حال بارگیری فاکتور...</p>;
  }
  return (
    <div
      className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-s p-6"
      dir="rtl"
    >
      <header className="flex justify-between items-center pb-6 border-b border-gray-300">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">فاکتور فروش</h1>
          <p className="text-sm text-gray-600">آرمان کمپانی</p>
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-600">شماره: {invoiceData?.id}</p>
          <p className="text-sm text-gray-600">تاریخ: {invoiceData?.date}</p>
        </div>
      </header>

      <section className="my-6">
        <p className="text-sm text-gray-600">نام: {invoiceData?.customer}</p>
        <p className="text-sm text-gray-600">تلفن: {invoiceData?.phone}</p>
      </section>

      <table className="w-full border-collapse border border-gray-300 text-sm text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">شرح</th>
            <th className="border border-gray-300 p-2">توضیحات</th>
            <th className="border border-gray-300 p-2">تعداد</th>
            <th className="border border-gray-300 p-2">قیمت واحد</th>
            <th className="border border-gray-300 p-2">مبلغ کل</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">
                {product.description}
              </td>
              <td className="border border-gray-300 p-2">{product.quantity}</td>
              <td className="border border-gray-300 p-2">{product.price}</td>
              <td className="border border-gray-300 p-2">
                {product.total_price}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100">
          <tr>
            <td
              colSpan={5}
              className="border border-gray-300 p-2 font-bold text-right"
            >
              جمع فاکتور:
            </td>
            <td className="border border-gray-300 p-2">
              {invoiceData?.total_without_discount}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              className="border border-gray-300 p-2 font-bold text-right"
            >
              تخفیف:
            </td>
            <td className="border border-gray-300 p-2">
              {invoiceData?.total_discount}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              className="border border-gray-300 p-2 font-bold text-right"
            >
              مبلغ قابل پرداخت:
            </td>
            <td className="border border-gray-300 p-2">{invoiceData?.total}</td>
          </tr>
        </tfoot>
      </table>

      <footer className="mt-10 flex justify-between items-center text-sm">
        <p className="text-gray-600">امضا فروشنده</p>
        <p className="text-gray-600">امضا خریدار</p>
      </footer>
    </div>
  );
};

export default InvoiceComponent;
