"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchSellers } from "@/store/storeSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { customerAssignmentAction } from "@/utils/actions";

type CustomerAssignmentFormProps = {
  customerIds: number[];
  setOpen: (state: boolean) => void;
};

function CustomerAssignmentForm({
  customerIds,
  setOpen,
}: CustomerAssignmentFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { sellers } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    if (sellers.length == 0) dispatch(fetchSellers());
  }, [dispatch, sellers]);

  const [formData, setFormData] = useState({
    customerIds: customerIds || null,
    user_id: "",
  });

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer action={customerAssignmentAction} setOpen={setOpen}>
      <div className="grid md:grid-cols-1 gap-4 mt-4 w-64">
        <Input
          type="hidden"
          value={customerIds.join(",")}
          name="customer_ids"
        />
        {/* leader */}
        <div className="mb-2">
          <Label>فروشنده</Label>
          <Select
            dir="rtl"
            name="user_id"
            value={formData.user_id.toString()}
            onValueChange={(value) => handleChange("user_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="فروشنده  موردنظر را انتخاب کنید">
                {sellers.find((seller) => seller.id == formData.user_id)
                  ?.fullname || "فروشنده  موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sellers.map((seller) => (
                  <SelectItem key={seller.id} value={seller.id.toString()}>
                    {seller.fullname}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <SubmitButton text="ذخیره" className=" w-full mt-8 " />
    </FormContainer>
  );
}

export default React.memo(CustomerAssignmentForm);
