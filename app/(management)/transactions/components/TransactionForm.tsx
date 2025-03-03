"use client";
import { useState, useEffect, useActionState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import { Transaction, TransactionStatus } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleTransactionAction } from "@/utils/actions";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  getCategories,
  fetchFailures,
  getCustomerCategories,
} from "@/store/storeSlice";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
type TransactionFormProps = {
  transaction?: Transaction | null;
  customerId?: string | null;
  editMode: boolean;
  onFormSubmit: (data: Transaction) => void;
};
const initialState = {
  message: "",
  success: false,
};
function TransactionForm({
  transaction,
  customerId,
  editMode,
  onFormSubmit,
}: TransactionFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { failures, customerCategories } = useSelector(
    (state: RootState) => state.store
  );

  const [state, formAction] = useActionState(
    handleTransactionAction,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
    if (state?.success && state?.data) {
      onFormSubmit(state.data);
    }
  }, [state, toast, onFormSubmit]);

  const [formData, setFormData] = useState({
    id: transaction?.id || null,
    title: transaction?.title || "",
    category_id: transaction?.category?.id.toString() || "",
    status: transaction?.status || TransactionStatus.NEW,
    failure_id: transaction?.failure?.id.toString() || "",
    description: transaction?.description || "",
  });

  useEffect(() => {
    if (customerCategories.length === 0) dispatch(getCustomerCategories());
    if (failures.length === 0) dispatch(fetchFailures());
  }, [dispatch, customerCategories.length, failures.length]);

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value === "" ? null : value }));
  };
  return (
    <div className="border border-gray-200 p-4 rounded-xl">
      <h1 className="w-full text-2xl">
        {editMode ? "ویرایش معامله" : "معامله جدید"}
      </h1>
      <form action={formAction} className="w-full">
        <div className="grid md:grid-cols-1 gap-4 mt-4">
          {transaction?.id && (
            <Input type="hidden" value={transaction?.id} name="id" />
          )}
          {!!Number(customerId) && customerId && (
            <Input type="hidden" value={customerId} name="customer_id" />
          )}
          <div className="mb-2">
            <Label>عنوان </Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          {/* category */}
          <div className="mb-2">
            <Label>دسته بندی</Label>
            <Select
              dir="rtl"
              name="category_id"
              value={formData.category_id}
              onValueChange={(value) => handleChange("category_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="دسته  موردنظر را انتخاب کنید">
                  {customerCategories.find((c) => c.id == formData.category_id)
                    ?.title || "دسته موردنظر را انتخاب کنید"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {customerCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {!editMode && (
            <Input type="hidden" value={TransactionStatus.NEW} name="status" />
          )}
          {editMode && (
            <div className="mb-2">
              <Label>وضعیت</Label>
              <Select
                dir="rtl"
                name="status"
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="وضعیت موردنظر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(TransactionStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === TransactionStatus.NEW
                          ? "جدید"
                          : status === TransactionStatus.FAILED
                          ? "ناموفق"
                          : "موفق"}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {editMode && (
            <div className="mb-2">
              <Label>علت عدم موفقیت</Label>
              <Select
                dir="rtl"
                name="failure_id"
                value={formData.failure_id}
                onValueChange={(value) => handleChange("failure_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="علت  موردنظر را انتخاب کنید">
                    {failures.find((f) => f.id == formData.failure_id)?.title ||
                      "علت موردنظر را انتخاب کنید"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={null}>هیچ‌کدام</SelectItem>
                    {failures.map((failure) => (
                      <SelectItem
                        key={failure.id}
                        value={failure.id.toString()}
                      >
                        {failure.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          <Textarea
            name="description"
            defaultValue={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <SubmitButton text="ذخیره" className=" w-full mt-8" />
      </form>
    </div>
  );
}

export default TransactionForm;
