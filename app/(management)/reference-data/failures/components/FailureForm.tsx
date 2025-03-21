"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
// import { Failure } from "@/utils/types";
import FormContainer from "@/components/form/FormContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleFailureAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";

type FailureFormProps = {
  failure?: any | null;
  edit?: boolean;
  setOpen: (state: boolean) => void;
};

function FailureForm({ failure, setOpen }: FailureFormProps) {
  const [formData, setFormData] = useState({
    id: failure?.id || null,
    title: failure?.title || "",
    description: failure?.description || "",
  });

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer action={handleFailureAction} setOpen={setOpen}>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {!!formData.id && (
          <Input type="hidden" value={failure?.id || ""} name="id" />
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
      <div className="flex justify-center items-center gap-2 mt-8">
        <SubmitButton text="ذخیره" />
        <Button onClick={() => setOpen(false)} size={"lg"} variant={"outline"}>
          انصراف
        </Button>
      </div>
    </FormContainer>
  );
}

export default React.memo(FailureForm);
