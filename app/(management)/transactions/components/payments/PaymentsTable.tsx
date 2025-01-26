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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PaymentForm from "@/app/(management)/transactions/components/payments/PaymentForm";
import { Button } from "@/components/ui/button";
import { isoToPersian } from "@/utils/dateConvertor";
import { X } from "lucide-react";
import { PaymentStatus, PaymentType } from "@/utils/types";
import ModalContainer from "@/components/common/ModalContainer";
import { toast } from "@/hooks/use-toast";
import { sendToFinanceSectionAction } from "@/utils/actions";
import AttachFilesForm from "./AttachFileForm";
function PaymentsTable({
  data,
  onRevalidation,
  transactionId,
}: {
  data;
  onRevalidation;
  transactionId;
}) {
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openFile, setOpenFile] = useState(false);
  const [activePayment, setActivePayment] = useState(null);
  const [sendedPayments, setSendedPayments] = useState([]);
  const handleOpenDialog = (task) => {
    setActivePayment(task);
    setOpenEdit(true);
  };

  useEffect(() => {
    if (openEdit === false) setActivePayment(null);
  }, [openEdit, activePayment]);

  const handleSendToFinanceSection = async (paymentId: number) => {
    const { success, message } = await sendToFinanceSectionAction(paymentId);
    if (success) {
      toast({ description: message });
      setSendedPayments((prev) => [...prev, paymentId]);
      onRevalidation()
    }
  };

  const payments = data;
  return (
    <div className="border border-gray-200 rounded-xl ">
      <div className="m-16 flex justify-end items-center gap-4">
        <ModalContainer
          dialogTitle="پرداخت جدید"
          buttonText="پرداخت جدید"
          open={openNew}
          setOpen={setOpenNew}
        >
          <PaymentForm
            setOpen={setOpenNew}
            revalidation={onRevalidation}
            transactionId={transactionId}
          />
        </ModalContainer>
      </div>
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10rem] text-right">مبلغ</TableHead>
            <TableHead className="w-[12rem] text-right">تاریخ</TableHead>
            <TableHead className="w-[12rem] text-right">نوع پرداخت </TableHead>
            <TableHead className="w-[6rem] text-right">پیوست</TableHead>
            <TableHead className="w-[15rem] text-right">وضعیت</TableHead>
            <TableHead className="w-[20rem] text-right">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment) => {
            const {
              id: paymentId,
              amount,
              date,
              payment_type,
              attachment,
              status,
            } = payment;
            return (
              <TableRow key={paymentId}>
                <TableCell className="w-[10rem] text-right">{amount}</TableCell>
                <TableCell className="w-[12rem] text-right">
                  {isoToPersian(date)?.toString()}
                </TableCell>
                <TableCell className="w-[12rem] text-right">
                  {payment_type === PaymentType.INSTALLMENT ? "قسطی" : "نقدی"}
                </TableCell>
                <TableCell className="w-[6rem] text-right">
                  {!!attachment ? "دارد" : "ندارد"}
                </TableCell>
                <TableCell className="w-[15rem] text-right">
                  {status === PaymentStatus.NEW
                    ? "جدید"
                    : status === PaymentStatus.APPROVED
                    ? "تایید شده"
                    : status === PaymentStatus.REJECTED
                    ? "رد شده"
                    : "در انتظار تایید"}
                </TableCell>
                <TableCell className="w-[20rem] text-right flex gap-2">
                  <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleOpenDialog(payment)}
                        variant="outline"
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
                          onClick={() => setOpenEdit(false)}
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
                        setOpen={setOpenEdit}
                        revalidation={onRevalidation}
                        transactionId={transactionId}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => handleSendToFinanceSection(paymentId)}
                    disabled={sendedPayments.includes(paymentId)}
                    size="sm"
                  >
                    ارسال به مالی
                  </Button>
                  <ModalContainer
                    buttonText="پیوست"
                    dialogTitle="پیوست "
                    open={openFile}
                    setOpen={setOpenFile}
                  >
                    <AttachFilesForm
                      paymentId={paymentId.toString()}
                      setOpen={setOpenFile}
                      revalidation={onRevalidation}
                    />
                  </ModalContainer>{" "}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default PaymentsTable;
