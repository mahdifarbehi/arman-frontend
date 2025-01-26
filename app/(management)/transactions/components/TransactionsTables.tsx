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
    <div className="border border-gray-200 rounded-xl ">
      <Table dir="rtl">
        <TableCaption>مجموع معاملات : {transactions.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10rem] text-right"> عنوان </TableHead>
            <TableHead className="w-[8rem] text-right">دسته بندی</TableHead>
            <TableHead className="w-[8rem] text-right"> مشتری</TableHead>
            <TableHead className="w-[8rem] text-right">شماره تماس</TableHead>
            <TableHead className="w-[8rem] text-right">آخرین فعالیت</TableHead>
            <TableHead className="w-[8rem] text-right">تاریخ </TableHead>
            <TableHead className="w-[8rem] text-right">وضعیت معامله</TableHead>
            <TableHead className="w-[15rem] text-right">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const { transaction: transactionObj, task } = transaction;
            return (
              <TableRow key={transactionObj.id}>
                <TableCell className="w-[10rem] text-right">
                  {transactionObj.title}
                </TableCell>
                <TableCell className="w-[8rem] text-right">
                  {transactionObj?.category?.title}
                </TableCell>
                <TableCell className="w-[8rem] text-right">
                  {transactionObj?.customer?.fullname}
                </TableCell>
                <TableCell className="w-[8rem] text-right">
                  {transactionObj?.customer?.phones[0]?.phone}
                </TableCell>
                <TableCell className="w-[8rem] text-right">
                  {task?.task_type?.title}
                </TableCell>
                <TableCell className="w-[8rem] text-right">
                  {task?.task_date
                    ? isoToPersian(task?.task_date).toString()
                    : ""}
                </TableCell>
                <TableCell className="w-[8rem] text-right">
                  {transactionObj.status === TransactionStatus.NEW
                    ? "جدید"
                    : transactionObj.status === TransactionStatus.FAILED
                    ? "ناموفق"
                    : "موفق"}
                </TableCell>

                <TableCell className="w-[15rem] text-right flex gap-2">
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
