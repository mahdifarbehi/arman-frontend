import { SubmitButton } from "@/components/form/Buttons";

import PersianDateTimePicker from "@/components/common/PersianDateTimePicker";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleTransactionPaymentAction } from "@/utils/actions";
import { Input } from "@/components/ui/input";
import { PaymentType } from "@/utils/types";
import { persianToISO, isoToPersian } from "@/utils/dateConvertor";

type PaymentFormProps = {
  payment?: any | null;
  edit?: boolean;
  open?: boolean;
  setOpen?: (state: boolean) => void;
  revalidation: () => void;
  transactionId: number;
};
const initialState = {
  message: "",
  success: false,
};
const PaymentForm = ({
  payment = null,
  setOpen,
  revalidation,
  transactionId,
}: PaymentFormProps) => {
  const [state, formAction] = useActionState(
    handleTransactionPaymentAction,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
    if (state?.success) {
      revalidation();
      setOpen(false);
    }
  }, [state, setOpen, toast, revalidation]);

  const [formData, setFormData] = useState({
    id: payment?.id || null,
    date: payment?.date || "",
    amount: payment?.amount || "",
    payment_type: payment?.payment_type || "",
  });
  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={formAction} className="w-full">
      {!!payment?.id && <Input type="hidden" value={payment?.id} name="id" />}
      <Input type="hidden" value={transactionId} name="transaction_id" />
      <div className="grid md:grid-cols-1 gap-4 mt-4">
        <div className="mb-2">
          <Label>مبلغ</Label>
          <Input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />
        </div>
        <PersianDateTimePicker
          text="تاریخ و ساعت"
          name="date"
          value={isoToPersian(formData?.date)}
          onDateChange={(e) => handleChange("date", persianToISO(e.toString()))}
        />
        <Input type="hidden" value={formData?.date.toString()} name="date" />

        <div className="mb-2">
          <Label>نوع پرداخت </Label>
          <Select
            dir="rtl"
            name="payment_type"
            value={formData.payment_type}
            onValueChange={(value) => handleChange("payment_type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="نوع پرداخت را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(PaymentType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === PaymentType.INSTALLMENT ? "قسطی" : "نقدی"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-8">
        <SubmitButton text="ذخیره" className=" w-full" />
      </div>
    </form>
  );
};

export default PaymentForm;
