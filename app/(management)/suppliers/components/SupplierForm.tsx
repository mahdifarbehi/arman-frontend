"use client";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import { Phone, Supplier } from "@/utils/types";
import FormContainer from "@/components/form/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleSupplierAction } from "@/utils/actions";
import { getCategories } from "@/store/storeSlice";
import PhoneInput from "@/components/form/PhoneInput";

type SupplierFormProps = {
  supplier?: Supplier | null;
  edit?: boolean;
  setOpen: (state: boolean) => void;
};

function SupplierForm({ supplier, setOpen }: SupplierFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    id: supplier?.id || null,
    company_name: supplier?.company_name || "",
    contact_name: supplier?.contact_name || "",
    category_id: supplier?.category?.id || 0,
    quality: supplier?.quality || "",
    description: supplier?.description || "",
    phones: supplier?.phones || [],
  });

  const [phones, setPhones] = useState<Phone[]>(supplier?.phones || []);

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer action={handleSupplierAction} setOpen={setOpen}>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {!!formData.id && (
          <Input type="hidden" value={supplier?.id || ""} name="id" />
        )}
        {/* company */}
        <div className="mb-2">
          <Label>نام شرکت</Label>
          <Input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={(e) => handleChange("company_name", e.target.value)}
          />
        </div>
        {/* contact_name */}
        <div className="mb-2">
          <Label>نام تامین کننده </Label>
          <Input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={(e) => handleChange("contact_name", e.target.value)}
          />
        </div>
        {/* category */}
        <div className="mb-2">
          <Label>دسته بندی</Label>
          <Select
            dir="rtl"
            name="category_id"
            value={formData.category_id?.toString()}
            onValueChange={(value) => handleChange("category_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="دسته  موردنظر را انتخاب کنید">
                {categories.find((c) => c.id == formData.category_id)?.title ||
                  "دسته موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Phones */}
        <div className="mb-2">
          {/* <Label>تلفن‌ها</Label> */}
          <PhoneInput phones={phones} setPhones={setPhones} label="تلفن" />
        </div>
        {/* Hidden Input for Phones */}
        <Input type="hidden" name="phones" value={JSON.stringify(phones)} />
        <div className="mb-2">
          <Label>کیفیت </Label>
          <Input
            type="text"
            name="quality"
            value={formData.quality}
            onChange={(e) => handleChange("quality", e.target.value)}
          />
        </div>
      </div>
      {/*Quality */}

      <div className="mb-2">
        <Label>توضیحات</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
        />
      </div>
      <SubmitButton text="ذخیره" className="w-full mt-8" />
    </FormContainer>
  );
}

export default React.memo(SupplierForm);
