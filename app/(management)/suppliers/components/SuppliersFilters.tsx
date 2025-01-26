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

function SuppliersFilters({ search }: { search?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.store);
  const [category, setCategory] = useState<string | null>(null);
  let filteredLink = "";

  const searchTerm = search ? `search=${search}` : "";
  const router = useRouter();
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  const handleFilters = () => {
    filteredLink = `/suppliers?${new URLSearchParams({
      ...(searchTerm ? { search } : {}),
      ...(category ? { categoryId: category } : {}),
    }).toString()}`;
    router.push(filteredLink);
  };
  const handleResetFilters = () => {
    setCategory(null);
    filteredLink = `/suppliers?${searchTerm}`;
    router.push(filteredLink);
  };

  return (
    <div className=" gap-2 flex flex-col">
        <Label>دسته بندی</Label>
      <div className="flex gap-4 items-center">
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

     
      <div className=" gap-4 flex">
        <Button className="w-32" onClick={handleFilters}>
          فیلتر
        </Button>
        <Button className="w-32" variant="outline" onClick={handleResetFilters}>
          حذف فیلتر
        </Button>
      </div>
      </div>
    </div>
  );
}

export default SuppliersFilters;
