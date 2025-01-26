"use client";

import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import { MaritalStatus, type User, Role } from "@/utils/types";
import FormContainer from "@/components/form/FormContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { handleUserAction } from "@/utils/actions";
import { getLeaders } from "@/store/storeSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

type UserFormProps = {
  user?: User | null;
  edit?: boolean;
  setOpen: (state: boolean) => void;
};

function UserForm({ user, setOpen }: UserFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { leaders } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    if (leaders.length == 0) dispatch(getLeaders());
  }, [dispatch, leaders]);
  const [formData, setFormData] = useState({
    id: user?.id || null,
    username: user?.username || "",
    phone: user?.phone || "",
    marital_status: user?.marital_status || MaritalStatus.SINGLE,
    role: user?.role || Role.ADMIN,
    leader: user?.leader_user?.id || 0,
    password: user?.password || "",
    fullname: user?.fullname || "",
    national_code: user?.national_code || "",
    birth_certificate_number: user?.birth_certificate_number || "",
    place_of_issue: user?.place_of_issue || "",
    place_of_birth: user?.place_of_birth || "",
    date_of_birth: user?.date_of_birth || "",
    father_name: user?.father_name || "",
    address: user?.address || "",
    bank_name: user?.bank_name || "",
    bank_account_number: user?.bank_account_number || "",
    shaba_number: user?.shaba_number || "",
    employee_id: user?.employee_id || "",
    work_phone: user?.work_phone || "",
    has_headphone: user?.has_headphone || false,
    has_pc: user?.has_pc || false,
    monthly_target: user?.monthly_target || 0,
  });

  const handleChange = (field: string, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer action={handleUserAction} setOpen={setOpen}>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {!!user?.id && <Input type="hidden" value={user?.id} name="id" />}
        {/* Username */}
        <div className="mb-2">
          <Label>نام کاربری</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>
        {/* Password */}
        <div className="mb-2">
          <Label>رمز عبور</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        {/* Role */}
        <div className="mb-2">
          <Label>نقش</Label>
          <Select
            dir="rtl"
            name="role"
            value={formData.role}
            onValueChange={(value) => handleChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="نقش کاربر" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(Role).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role === Role.ADMIN
                      ? "مدیر کل"
                      : role === Role.PAYMENT_MANAGER
                      ? "مدیر مالی"
                      : role === Role.PRODUCT_MANAGER
                      ? "مدیر محصول"
                      : role === Role.SALES_AGENT
                      ? "فروشنده"
                      : "مدیر فروش"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Monthly Target */}
        <div className="mb-2">
          <Label>هدف ماهانه</Label>
          <Input
            type="number"
            name="monthly_target"
            value={formData.monthly_target}
            onChange={(e) => handleChange("monthly_target", +e.target.value)}
          />
        </div>
        {/* Leader */}
        <div className="mb-2">
          <Label>سرپرست</Label>
          <Select
            dir="rtl"
            name="leader"
            value={formData.leader.toString()} // Use the state for selected leader
            onValueChange={(value) => handleChange("leader", +value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="سرپرست  موردنظر را انتخاب کنید">
                {leaders.find((leader) => leader.id == formData.leader)
                  ?.fullname || "سرپرست موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {leaders.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id.toString()}>
                    {leader.fullname}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* employee_id */}
        <div className="mb-2">
          <Label>کد پرسنلی </Label>
          <Input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={(e) => handleChange("employee_id", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Label>نام بانک</Label>
          <Input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={(e) => handleChange("bank_name", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Label>شماره کارت</Label>
          <Input
            type="text"
            name="bank_account_number"
            value={formData.bank_account_number}
            onChange={(e) =>
              handleChange("bank_account_number", e.target.value)
            }
          />
        </div>
        <div className="mb-2">
          <Label>شماره شبا</Label>
          <Input
            type="text"
            name="shaba_number"
            value={formData.shaba_number}
            // onChange={(e) => handleChange("shaba_number", e.target.value)}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              handleChange("shaba_number", `IR${value}`);
            }}
          />
        </div>
        {/* Fullname */}
        <div className="mb-2">
          <Label>نام و نام خانوادگی</Label>
          <Input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
        </div>
        {/* fathername */}
        <div className="mb-2">
          <Label>نام پدر </Label>
          <Input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={(e) => handleChange("father_name", e.target.value)}
          />
        </div>
        {/* National Code */}
        <div className="mb-2">
          <Label>کد ملی</Label>
          <Input
            type="text"
            name="national_code"
            value={formData.national_code}
            onChange={(e) => handleChange("national_code", e.target.value)}
          />
        </div>
        {/* Birth Certificate Number */}
        <div className="mb-2">
          <Label>شماره شناسنامه</Label>
          <Input
            type="text"
            name="birth_certificate_number"
            value={formData.birth_certificate_number}
            onChange={(e) =>
              handleChange("birth_certificate_number", e.target.value)
            }
          />
        </div>
        {/* place of issue */}
        <div className="mb-2">
          <Label>محل صدور</Label>
          <Input
            type="text"
            name="place_of_issue"
            value={formData.place_of_issue}
            onChange={(e) => handleChange("place_of_issue", e.target.value)}
          />
        </div>
        {/* place of birth */}
        <div className="mb-2">
          <Label>محل تولد</Label>
          <Input
            type="text"
            name="place_of_birth"
            value={formData.place_of_birth}
            onChange={(e) => handleChange("place_of_birth", e.target.value)}
          />
        </div>
        {/* Marital Status */}
        <div className="mb-2">
          <Label>وضعیت تاهل</Label>
          <Select
            value={formData.marital_status}
            onValueChange={(value) => handleChange("marital_status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="وضعیت تاهل" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(MaritalStatus).map((ms) => (
                  <SelectItem key={ms} value={ms}>
                    {ms === MaritalStatus.SINGLE ? "مجرد" : "متاهل"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Phone */}
        <div className="mb-2">
          <Label>شماره تماس شخصی</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        {/* work phone */}
        <div className="mb-2">
          <Label>شماره تماس کاری</Label>
          <Input
            type="text"
            name="work_phone"
            value={formData.work_phone}
            onChange={(e) => handleChange("work_phone", e.target.value)}
          />
        </div>{" "}
        {/* Address */}
        <div className="mb-2">
          <Label>آدرس</Label>
          <Textarea
            name="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        {/* Has Headphone */}
        <div className="mb-2 gap-2 flex items-center">
          <Label>هدفون دارد</Label>
          <Checkbox
            name="has_headphone"
            defaultChecked={user?.has_headphone || false}
            onChange={(e) => handleChange("has_headphone", Boolean(e))}
          />
        </div>
        {/* Has PC */}
        <div className="mb-2 gap-2 flex items-center">
          <Label>سیستم دارد</Label>
          <Checkbox
            name="has_pc"
            defaultChecked={user?.has_pc || false}
            onChange={(e) => handleChange("has_pc", Boolean(e))}
          />
        </div>
      </div>

      <SubmitButton text="ذخیره" className="w-full mt-8" />
    </FormContainer>
  );
}

export default React.memo(UserForm);
