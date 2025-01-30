"use client";
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

function TransactionsTable({ data }: { data }) {
  const transactions = data;

  return (
    <div className="border border-gray-200 rounded-xl p-4">
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
          {transactions.map((transaction) => {
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
    </div>
  );
}

export default TransactionsTable;
