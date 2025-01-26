"use client";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import { Product } from "@/utils/types";
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

import { handleProductAction } from "@/utils/actions";
import { getCategories } from "@/store/storeSlice";
import { Button } from "@/components/ui/button";
type ProductFormProps = {
  product?: Product | null;
  edit?: boolean;
  setOpen: (state: boolean) => void;
};

function ProductForm({ product, setOpen }: ProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
  }, [dispatch, categories.length]);
  const [formData, setFormData] = useState({
    id: product?.id || null,
    title: product?.title || "",
    category_id: product?.category.id || 0,
    description: product?.description || "",
  });

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer action={handleProductAction} setOpen={setOpen}>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {!!formData.id && (
          <Input type="hidden" value={product?.id || ""} name="id" />
        )}
        {/* company */}
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
            value={formData.category_id?.toString()}
            onValueChange={(value) => handleChange("category_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="دسته  موردنظر را انتخاب کنید">
                {categories.find((c) => c.id === formData.category_id)?.title ||
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
      </div>

      <div className="mb-2">
        <Label>توضیحات</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <SubmitButton text="ذخیره" />
        <Button onClick={() => setOpen(false)} size={"lg"} variant={"outline"}>
          انصراف
        </Button>
      </div>
    </FormContainer>
  );
}

export default React.memo(ProductForm);
