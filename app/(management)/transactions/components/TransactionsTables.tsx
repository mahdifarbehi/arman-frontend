"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isoToPersian } from "@/utils/dateConvertor";
import { Button } from "@/components/ui/button";
import { TransactionStatus } from "@/utils/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

function TransactionsTable({ data }: { data }) {
  const transactions = data;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(data.length);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      {currentItems.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع معاملات : {transactions.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">عنوان</TableHead>
              <TableHead className="text-center">دسته بندی</TableHead>
              <TableHead className="text-center">مشتری</TableHead>
              <TableHead className="text-center">شماره تماس</TableHead>
              <TableHead className="text-center">آخرین فعالیت</TableHead>
              <TableHead className="text-center">تاریخ</TableHead>
              <TableHead className="text-center">وضعیت معامله</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((transaction) => {
              const { transaction: transactionObj, task } = transaction;
              return (
                <TableRow key={transactionObj.id}>
                  <TableCell>{transactionObj.title}</TableCell>
                  <TableCell>{transactionObj?.category?.title}</TableCell>
                  <TableCell>{transactionObj?.customer?.fullname}</TableCell>
                  <TableCell>
                    {transactionObj?.customer?.phones[0]?.phone}
                  </TableCell>
                  <TableCell>{task?.task_type?.title}</TableCell>
                  <TableCell>
                    {task?.task_date
                      ? isoToPersian(task?.task_date).toString()
                      : "نامشخص"}
                  </TableCell>
                  <TableCell>
                    {transactionObj.status === TransactionStatus.NEW
                      ? "جدید"
                      : transactionObj.status === TransactionStatus.FAILED
                      ? "ناموفق"
                      : "موفق"}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button asChild>
                      <Link href={`/transactions/${transactionObj.id}`}>
                        ویرایش
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      <div className="flex justify-center mt-4 mb-5">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronRight className="h-4 w-4" />
          صفحه قبل
        </Button>
        <div className="flex items-center mx-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          صفحه بعد
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default TransactionsTable;
