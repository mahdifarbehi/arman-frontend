"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import type { Phone, Customer } from "@/utils/types";
import FormContainer from "@/components/form/FormContainer";
import { CustomerStatus } from "@/utils/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchOrigins,
  fetchSellers,
  getCustomerCategories,
} from "@/store/storeSlice";
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
import { Textarea } from "@/components/ui/textarea";
import { handleCustomerAction } from "@/utils/actions";
import PhoneInput from "@/components/form/PhoneInput";

type CustomerFormProps = {
  customer?: Customer | null;
  edit?: boolean;
  setOpen: (state: boolean) => void;
  onCustomerSubmit: () => void;
};

function CustomerForm({
  customer,
  setOpen,
  onCustomerSubmit,
}: CustomerFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { origins, sellers, customerCategories } = useSelector(
    (state: RootState) => state.store
  );

  useEffect(() => {
    if (customerCategories.length == 0) dispatch(getCustomerCategories());

    if (origins.length == 0) dispatch(fetchOrigins());
    if (sellers.length == 0) dispatch(fetchSellers());
  }, [dispatch, origins, sellers, customerCategories]);

  const [formData, setFormData] = useState({
    id: customer?.id || null,
    fullname: customer?.fullname || "",
    company: customer?.company || "",
    email: customer?.email || "",
    website: customer?.website || "",
    status: customer?.status || "NEW",
    origin_id: customer?.origin?.id || "",
    category_id: customer?.category?.id || "",
    phones: customer?.phones || [],
    assigned_to: customer?.assigned_to?.id || "",
    description: customer?.description || "",
  });
  const [phones, setPhones] = useState<Phone[] | []>(customer?.phones || []);

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer
      action={handleCustomerAction}
      setOpen={setOpen}
      onFormSuccess={onCustomerSubmit}
    >
      {!!customer?.id && <Input type="hidden" value={customer?.id} name="id" />}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {/* {fullname} */}
        <div className="mb-2">
          <Label>نام و نام خانوادگی</Label>
          <Input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
        </div>
        {/* Company */}
        <div className="mb-2">
          <Label>نام شرکت</Label>
          <Input
            name="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>
        {/* email */}
        <div className="mb-2">
          <Label>ایمیل</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        {/* website */}
        <div className="mb-2">
          <Label>وب سایت</Label>
          <Input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
        {/* Status */}
        <div className="mb-2">
          <Label>وضعیت</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(CustomerStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === CustomerStatus.NEW
                      ? "جدید"
                      : status === CustomerStatus.ACTIVE
                      ? "فعال"
                      : "غیرفعال"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Origin */}
        <div className="mb-2">
          <Label>مبدا</Label>
          <Select
            dir="rtl"
            name="origin_id"
            value={formData.origin_id.toString()} // Use the state for selected origin
            onValueChange={(value) => handleChange("origin_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="مبدا  موردنظر را انتخاب کنید">
                {origins.find((o) => o.id == formData.origin_id)?.title ||
                  "مبدا موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {origins.map((origin) => (
                  <SelectItem key={origin.id} value={origin.id.toString()}>
                    {origin.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Assigned To */}
        <div className="mb-2">
          <Label>فروشنده</Label>
          <Select
            dir="rtl"
            name="assigned_to"
            value={formData.assigned_to.toString()}
            onValueChange={(value) => handleChange("assigned_to", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="فروشنده  موردنظر را انتخاب کنید">
                {sellers.find((s) => s.id == formData.assigned_to)?.fullname ||
                  "فروشنده موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sellers.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.fullname}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* category */}
        <div className="mb-2">
          <Label>دسته بندی</Label>
          <Select
            dir="rtl"
            name="category_id"
            value={formData.category_id.toString()}
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
      </div>
      {/* description */}
      <div className="mb-2">
        <Label>توضیحات</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
        />
      </div>
      <SubmitButton text="ذخیره" className=" w-full mt-8 " />
    </FormContainer>
  );
}

export default React.memo(CustomerForm);
