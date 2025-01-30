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
import { TimeRange, TransactionStatus } from "@/utils/types";

function TransactionFilters({ search }: { search?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.store);

  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  let filteredLink = "";
  const searchTerm = search ? `search=${search}` : "";
  const router = useRouter();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  const handleFilters = () => {
    filteredLink = `/transactions?${new URLSearchParams({
      ...(searchTerm ? { search } : {}),
      ...(category ? { categoryId: category } : {}),
      ...(status ? { status } : {}),
      ...(date ? { date } : {}),
    }).toString()}`;

    router.push(filteredLink);
  };

  const handleResetFilters = () => {
    setCategory(null);
    setStatus(null);
    setDate(null);
    filteredLink = `/transactions?${searchTerm}`;

    router.push(filteredLink);
  };

  return (
    <div className="flex gap-4 mb-8">
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
            <SelectValue placeholder="انتخاب وضعیت" />
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
      <div className="mb-2">
        <Label>بازه زمانی</Label>
        <Select
          dir="rtl"
          name="date"
          value={date}
          onValueChange={(value) => setDate(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب بازه زمانی" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(TimeRange).map((time) => (
                <SelectItem key={time} value={time}>
                  {time === TimeRange.ONE_DAY
                    ? "یک روز"
                    : time === TimeRange.THREE_DAYS
                    ? "سه روز"
                    : time === TimeRange.ONE_WEEK
                    ? "یک هفته"
                    : time === TimeRange.ONE_MONTH
                    ? "یک ماه"
                    : ""}
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

export default TransactionFilters;
