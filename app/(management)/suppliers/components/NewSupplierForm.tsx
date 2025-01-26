"use client"
import ModalContainer from "@/components/common/ModalContainer";
import SupplierForm from "./SupplierForm";
import { useState } from "react";

 export default function NewSupplierForm() {
    const [open, setOpen] = useState(false);
    return (
      <ModalContainer
        dialogTitle="تامین کننده جدید"
        buttonText="تامین کننده جدید"
        open={open}
        setOpen={setOpen}
      >
        <SupplierForm setOpen={setOpen} />
      </ModalContainer>
    );
  }