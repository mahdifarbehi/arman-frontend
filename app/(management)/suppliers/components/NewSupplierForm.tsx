"use client";
import ModalContainer from "@/components/common/ModalContainer";
import SupplierForm from "./SupplierForm";
import { useState } from "react";

export default function NewSupplierForm() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ml-5">
      <ModalContainer
        dialogTitle="افزودن تامین کننده جدید"
        buttonText="افزودن تامین کننده جدید"
        open={open}
        setOpen={setOpen}
      >
        <SupplierForm setOpen={setOpen} />
      </ModalContainer>
    </div>
  );
}
