"use client";
import React from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {  PaymentStatus, PaymentType } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { handlePaymentStatusAction } from "@/utils/actions";
import { isoToPersian } from "@/utils/dateConvertor";
import { toast } from "@/hooks/use-toast";
type PaymentFormProps = {
  payment?: any;
  edit?: boolean;
  setOpen: (state: boolean) => void;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, setOpen }) => {
  const handleSendToFinanceSection = async (paymentId: number, status) => {
    const { success, message } = await handlePaymentStatusAction(
      paymentId,
      status
    );
    if (success) {
      toast({ description: message });
    }
    setOpen(false)
  };
  return (
    <>
      <Input type="hidden" value={payment?.id || ""} name="id" readOnly />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {/* Title */}
        <div className="mb-2">
          <Label>عنوان</Label>
          <Input
            type="text"
            name="title"
            value={payment?.transaction?.title || ""}
            readOnly
          />
        </div>
        {/* Category */}
        <div className="mb-2">
          <Label>دسته بندی</Label>
          <Input
            type="text"
            name="category_idd"
            value={payment?.transaction?.category?.title || ""}
            readOnly
          />
          <Input
            type="hidden"
            name="category_id"
            value={payment?.transaction?.category?.id || ""}
            readOnly
          />
        </div>
        {/* Amount */}
        <div className="mb-2">
          <Label>مبلغ</Label>
          <Input
            type="number"
            name="amount"
            value={payment?.amount || ""}
            readOnly
          />
        </div>
        {/* date and time */}
        <div className="mb-2">
          <Label>تاریخ وساعت</Label>
          <Input
            type="text"
            name="status_change_date"
            value={
              payment?.status_change_date
                ? isoToPersian(payment?.status_change_date).toString()
                : ""
            }
            readOnly
          />
        </div>
        {/* payment type */}
        <div className="mb-2">
          <Label>نوع فروش </Label>
          <Input
            type="text"
            name="payment_typee"
            value={payment?.payment_type === PaymentType.CASH ? "نقدی" : "قسطی"}
            readOnly
          />
          <Input
            type="hidden"
            name="payment_type"
            value={payment?.payment_type || ""}
            readOnly
          />
        </div>
        {/* Customer */}
        <div className="mb-2">
          <Label>نام مشتری</Label>
          <Input
            type="text"
            name="customerr"
            value={payment?.transaction?.customer.fullname || ""}
            readOnly
          />
          <Input
            type="hidden"
            name="customer"
            value={payment?.transaction?.customer.id || ""}
            readOnly
          />
        </div>
        {/* Phone */}
        <div className="mb-2">
          <Label>تلفن</Label>
          <Input
            type="text"
            name="phone"
            value={payment?.transaction?.customer?.phones[0]?.phone || ""}
            readOnly
          />
        </div>
        {/* sales agent */}
        <div className="mb-2">
          <Label>نام فروشنده</Label>
          <Input
            type="text"
            name="sales_agent"
            value={payment?.transaction?.created_by_user?.fullname || ""}
            readOnly
          />
          <Input
            type="hidden"
            name="sales_agent"
            value={payment?.transaction?.created_by_user?.id || ""}
            readOnly
          />
        </div>
        {/* Status */}
        <div className="mb-2">
          <Label>وضعیت</Label>
          <Input
            type="text"
            name="statuss"
            value={
              payment?.status === PaymentStatus.APPROVED
                ? "تایید شده"
                : payment?.status === PaymentStatus.NEW
                ? "جدید"
                : payment?.status === PaymentStatus.PENDING
                ? "در انتظار تایید"
                : "رد شده"
            }
            readOnly
          />
          {/* <Input type="hidden" name="status" value={payment?.status} readOnly /> */}
        </div>
        {/* status change date */}
        <div className="mb-2">
          <Label>تاریخ ثبت وضعیت</Label>
          <Input
            type="text"
            name="status_change_date"
            value={
              payment?.status_change_date
                ? isoToPersian(payment?.status_change_date).toString()
                : ""
            }
            readOnly
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          variant="outline"
          className="w-full mt-8 "
          onClick={() =>
            handleSendToFinanceSection(payment.id, PaymentStatus.REJECTED)
          }
        >
          رد پرداخت
        </Button>
        <Button
          type="submit"
          className="w-full mt-8 "
          onClick={() =>
            handleSendToFinanceSection(payment.id, PaymentStatus.APPROVED)
          }
        >
          تایید پرداخت
        </Button>
      </div>
    </>
  );
};

export default React.memo(PaymentForm);
