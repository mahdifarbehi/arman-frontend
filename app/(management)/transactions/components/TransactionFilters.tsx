"use client";

import { useEffect, useState } from "react";
import PersianDateTimePicker from "@/components/common/PersianDateTimePicker";
import { Button } from "@/components/ui/button";
import { persianToISO } from "@/utils/dateConvertor";
import { DateObject } from "react-multi-date-picker";
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
import { TransactionStatus } from "@/utils/types";

function TransactionFilters({ search }: { search?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.store);

  const [dtRange, setDtRange] = useState<{
    startDate: string | null;
    endDate: string | null;
  } | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  let filteredLink = "";
  const now = new DateObject();
  const firstDatetime = new DateObject("1970-01-01T00:00:00Z");
  const searchTerm = search ? `search=${search}` : "";
  const router = useRouter();
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  const handleDateChange = (
    date: string | null | { startDate: string | null; endDate: string | null }
  ) => {
    if (!date) {
      setDtRange(null);
    } else if (typeof date === "object") {
      setDtRange({
        startDate: date.startDate
          ? persianToISO(date.startDate).toString()
          : null,
        endDate: date.endDate ? persianToISO(date.endDate).toString() : null,
      });
    } else {
      setDtRange({
        startDate: persianToISO(date).toString(),
        endDate: null,
      });
    }
  };

  const handleFilters = () => {
    filteredLink = `/transactions?${new URLSearchParams({
      ...(searchTerm ? { search } : {}),
      ...(dtRange?.startDate ? { startDate: dtRange.startDate } : {}),
      ...(dtRange?.endDate ? { endDate: dtRange.endDate } : {}),
      ...(category ? { categoryId: category } : {}),
      ...(status ? { status } : {}),
    }).toString()}`;
    router.push(filteredLink);
  };
  const handleResetFilters = () => {
    setDtRange(null);
    setCategory(null);
    setStatus(null);
    filteredLink = `/transactions?${searchTerm}`;
    router.push(filteredLink);
  };

  return (
    <div className="flex gap-4 mb-8">
      {/* <PersianDateTimePicker
        text="فیلتر بر اساس تاریخ و ساعت"
        name="datetime"
        range={true}
        minDate={firstDatetime}
        maxDate={now}
        onDateChange={handleDateChange}
      /> */}
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
