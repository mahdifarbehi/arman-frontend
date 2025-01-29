"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrigins, getCustomerCategories } from "@/store/storeSlice";
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
import { CustomerStatus } from "@/utils/types";

function CustomersFilters({ search }: { search?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { customerCategories, origins } = useSelector(
    (state: RootState) => state.store
  );

  const [origin, setOrigin] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (customerCategories.length === 0) {
      dispatch(getCustomerCategories());
    }
    if (origins.length === 0) {
      dispatch(fetchOrigins());
    }
  }, [dispatch, customerCategories.length, origins.length]);

  const handleFilters = () => {
    const link = `/customers?${new URLSearchParams({
      ...(search ? { search } : {}),
      ...(origin ? { originId: origin } : {}),
      ...(category ? { categoryId: category } : {}),
      ...(status ? { status } : {}),
    }).toString()}`;
    router.push(link);
  };

  const handleResetFilters = () => {
    setCategory("");
    setStatus("");
    setOrigin("");
    const link = `/customers?${search ? `search=${search}` : ""}`;
    router.push(link);
  };

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {/* دسته بندی */}
      <div className="mb-2">
        {/* <Label>دسته بندی</Label> */}
        <Select
          dir="rtl"
          name="category_id"
          value={category}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="دسته موردنظر را انتخاب کنید">
              {customerCategories.find((c) => c.id.toString() === category)
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

      {/* مبدا مشتری */}
      <div className="mb-2">
        {/* <Label>مبدا مشتری</Label> */}
        <Select
          dir="rtl"
          name="origin_id"
          value={origin}
          onValueChange={(value) => setOrigin(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="مبدا موردنظر را انتخاب کنید">
              {origins.find((o) => o.id.toString() === origin)?.title ||
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

      {/* وضعیت */}
      <div className="mb-2">
        {/* <Label>وضعیت</Label> */}
        <Select
          dir="rtl"
          name="status"
          value={status}
          onValueChange={(value) => setStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="وضعیت را انتخاب کنید" />
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

      {/* دکمه‌ها */}
      <div className="gap-4 flex">
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

export default CustomersFilters;
