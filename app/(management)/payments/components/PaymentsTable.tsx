"use client";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentForm from "./PaymentForm";
import { isoToPersian } from "@/utils/dateConvertor";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PaymentStatus, PaymentType, type Payment } from "@/utils/types";

function PaymentsTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activePayment, setActivePayment] = useState<Payment | undefined>(
    undefined
  );
  const handleOpenDialog = (payment: Payment) => {
    setActivePayment(payment);
    setOpen(true);
  };
  useEffect(() => {
    if (open === false) setActivePayment(undefined);
  }, [open, activePayment]);

  const payments = data;
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <Table dir="rtl">
        <TableCaption>مجموع پرداخت ها : {payments.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">عنوان معامله</TableHead>
            <TableHead className="text-center">دسته بندی</TableHead>
            <TableHead className="text-center"> مشتری</TableHead>
            <TableHead className="text-center">شماره تماس</TableHead>
            <TableHead className="text-center">وضعیت </TableHead>
            <TableHead className="text-center">تاریخ ثبت وضعیت</TableHead>
            <TableHead className="text-center"> فروشنده </TableHead>
            <TableHead className="text-center">نوع فروش</TableHead>
            <TableHead className="text-center">مبلغ</TableHead>
            <TableHead className="text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const {
              id: paymentId,
              transaction: {
                title,
                customer: { fullname: customerName, phones },
                category: { title: categoryTitle },
                created_by_user: { fullname: sales_agent },
              },
              status_change_date,
              payment_type,
              amount,
              status,
            } = payment;
            return (
              <TableRow key={paymentId}>
                <TableCell className="w-[10rem] text-center">{title}</TableCell>
                <TableCell className="text-center">{categoryTitle}</TableCell>
                <TableCell className="text-center">{customerName}</TableCell>
                <TableCell className="text-center">
                  {phones[0]?.phone}
                </TableCell>
                <TableCell className="text-center">
                  {status === PaymentStatus.NEW
                    ? "جدید"
                    : status === PaymentStatus.APPROVED
                    ? "تایید شده"
                    : status === PaymentStatus.REJECTED
                    ? "رد شده"
                    : "در انتظار تایید"}
                </TableCell>
                <TableCell className="text-center">
                  {isoToPersian(status_change_date).toString()}
                </TableCell>
                <TableCell className="text-center">{sales_agent}</TableCell>
                <TableCell className="text-center">
                  {payment_type === PaymentType.INSTALLMENT ? "قسطی" : "نقدی"}
                </TableCell>
                <TableCell className="text-center">{amount}</TableCell>
                <TableCell className="text-center justify-center flex gap-2">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleOpenDialog(payment)}
                        size="sm"
                      >
                        ویرایش
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="[&>button]:hidden"
                      aria-describedby={undefined}
                    >
                      <DialogHeader className="flex flex-row-reverse justify-between items-center">
                        <button
                          onClick={() => setOpen(false)}
                          className="p-2"
                          aria-label="Close"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <DialogTitle>ویرایش پرداخت</DialogTitle>
                      </DialogHeader>

                      <PaymentForm
                        payment={activePayment}
                        edit
                        setOpen={setOpen}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

// function NewCustomerForm() {
//   const [open, setOpen] = useState(false);
//   return (
//     <ModalContainer
//       dialogTitle="مشتری جدید"
//       buttonText="مشتری جدید"
//       open={open}
//       setOpen={setOpen}
//     >
//       <CustomerForm setOpen={setOpen} />
//     </ModalContainer>
//   );
// }

export default PaymentsTable;
