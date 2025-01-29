"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/store/storeSlice";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentStatus } from "@/utils/types";

function PaymentsFilters({ search }: { search?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.store);
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  let filteredLink = "";

  const searchTerm = search ? `search=${search}` : "";
  const router = useRouter();
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  const handleFilters = () => {
    filteredLink = `/payments?${new URLSearchParams({
      ...(searchTerm ? { search } : {}),
      ...(category ? { categoryId: category } : {}),
      ...(status ? { status } : {}),
    }).toString()}`;
    router.push(filteredLink);
  };
  const handleResetFilters = () => {
    setCategory(null);
    setStatus(null);
    filteredLink = `/payments?${searchTerm}`;
    router.push(filteredLink);
  };

  return (
    <div className="grid md:grid-cols-5 gap-4 mb-8">
      <div className="mb-2">
        <Label>دسته بندی</Label>
        <Select
          dir="rtl"
          name="category_id"
          value={category}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="دسته  موردنظر را انتخاب کنید">
              {categories.find((c) => c.id.toString() === category)?.title ||
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

      <div className="mb-2">
        <Label>وضعیت</Label>
        <Select
          dir="rtl"
          name="status"
          value={status}
          onValueChange={(value) => setStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="وضعیت پرداخت را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(PaymentStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status === PaymentStatus.NEW
                    ? "جدید"
                    : status === PaymentStatus.APPROVED
                    ? "تایید شده"
                    : status === PaymentStatus.REJECTED
                    ? "رد شده"
                    : "در انتظار تایید"}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 gap-4 flex">
        <Button className="w-32" onClick={handleFilters}>
          فیلتر
        </Button>
        <Button className="w-32" variant="outline" onClick={handleResetFilters}>
          حذف فیلتر
        </Button>
      </div>
    </div>
  );
}

export default PaymentsFilters;
