"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalContainer from "@/components/common/ModalContainer";
import SupplierForm from "./SupplierForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Supplier } from "@/utils/types";

function SuppliersTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeSupplier, setActiveSupplier] = useState<Supplier | undefined>(
    undefined
  );
  const handleOpenDialog = (supplier: Supplier) => {
    setActiveSupplier(supplier);
    setOpen(true);
  };
  const searchParams = useSearchParams();
  const supplierId = searchParams.get("supplierId");
  useEffect(() => {
    if (open === false) setActiveSupplier(undefined);
  }, [open, activeSupplier]);

  useEffect(() => {
    if (supplierId) {
      const supplier = data.find((d) => d.id === +supplierId);
      handleOpenDialog(supplier);
    }
  }, [supplierId, data]);

  const suppliers = data;
  return (
    <div className="border border-gray-200 rounded-xl ">
      {/* <div className=" flex justify-end items-center gap-4">
        <NewSupplierForm />
      </div> */}
      {suppliers.length !== 0 && (
        <Table dir="rtl">
          <TableCaption className="mb-4">
            مجموع تامین کنندگان : {suppliers.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">دسته بندی</TableHead>
              <TableHead className="text-center">نام شرکت </TableHead>
              <TableHead className="text-center">نام تامین کننده</TableHead>
              <TableHead className="text-center">شماره تماس </TableHead>
              <TableHead className="text-center">کیفیت تامین کننده</TableHead>
              <TableHead className="text-center"> توضیحات </TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier: Supplier) => {
              const {
                id: supplierId,
                category,
                company_name,
                phones,
                contact_name,
                quality,
                description,
              } = supplier;
              return (
                <TableRow key={supplierId}>
                  <TableCell className="wtext-center">
                    {category.title}
                  </TableCell>
                  <TableCell className="text-center">{company_name}</TableCell>
                  <TableCell className="text-center">{contact_name}</TableCell>
                  <TableCell className="text-center">
                    {phones[0]?.phone}
                  </TableCell>
                  <TableCell className="text-center">{quality}</TableCell>
                  <TableCell className="text-center">{description}</TableCell>
                  <TableCell className=" items-center justify-center  text-center flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(supplier)}
                          size="lg"
                        >
                          ویرایش
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="[&>button]:hidden w-dialog"
                        aria-describedby={undefined}
                      >
                        <DialogHeader className="flex flex-row-reverse justify-between items-center">
                          <button
                            onClick={() => setOpen(false)}
                            className="p-2"
                            aria-label="Close"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <DialogTitle>ویرایش تامین کننده</DialogTitle>
                        </DialogHeader>

                        <SupplierForm
                          supplier={activeSupplier}
                          edit
                          setOpen={setOpen}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// function NewSupplierForm() {
//   const [open, setOpen] = useState(false);
//   return (
//     <ModalContainer
//       dialogTitle="تامین کننده جدید"
//       buttonText="تامین کننده جدید"
//       open={open}
//       setOpen={setOpen}
//     >
//       <SupplierForm setOpen={setOpen} />
//     </ModalContainer>
//   );
// }

export default SuppliersTable;
