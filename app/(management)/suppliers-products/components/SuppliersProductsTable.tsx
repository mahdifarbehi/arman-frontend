"use client";
import { useEffect, useState } from "react";

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
import SupplierProductForm from "./SupplierProductForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { SupplierProduct } from "@/utils/types";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { deleteSupplierProduct } from "@/utils/actions";

function SuppliersProductsTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeSupplierProduct, setActiveSupplierProduct] = useState<
    SupplierProduct | undefined
  >(undefined);
  const handleOpenDialog = (SupplierProduct: SupplierProduct) => {
    setActiveSupplierProduct(SupplierProduct);
    setOpen(true);
  };
  useEffect(() => {
    if (open === false) setActiveSupplierProduct(undefined);
  }, [open, activeSupplierProduct]);

  const handleDelete = async (id: number) => {
    const result = await deleteSupplierProduct(id);
    if (result.message) toast({ description: result.message });
  };
  const supplierProducts = data;

  return (
    <div className="border border-gray-200 rounded-xl ">
      <div className="m-16 flex justify-end items-center gap-4">
        <NewSupplierProductForm />
      </div>
      {supplierProducts.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>
            مجموع محصولات تامین کنندگان : {supplierProducts.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10rem] text-right">دسته بندی</TableHead>
              <TableHead className="w-[8rem] text-right">نام محصول</TableHead>
              <TableHead className="w-[8rem] text-right">تامین کننده</TableHead>
              <TableHead className="w-[8rem] text-right">واحد</TableHead>
              <TableHead className="w-[8rem] text-right">قیمت</TableHead>
              <TableHead className="w-[8rem] text-right">
                قیمت با تخفیف
              </TableHead>
              <TableHead className="w-[8rem] text-right">
                پورسانت فروشنده
              </TableHead>
              <TableHead className="w-[8rem] text-right">کیفیت محصول</TableHead>
              <TableHead className="w-[15rem] text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplierProducts.map((supplierProduct: SupplierProduct) => {
              const {
                id: supplierProductId,
                product: {
                  title: productTitle,
                  category: { title: categoryTitle },
                },
                supplier: { company_name: companyName },
                unit,
                selling_price,
                discount_price,
                commission,
                quality,
              } = supplierProduct;
              return (
                <TableRow key={supplierProductId}>
                  <TableCell className="w-[10rem] text-right">
                    {categoryTitle}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {productTitle}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {companyName}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">{unit}</TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {selling_price}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {discount_price}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {commission}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {quality}
                  </TableCell>
                  <TableCell className="w-[15rem] text-right flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(supplierProduct)}
                          size="sm"
                        >
                          ویرایش
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="[&>button]:hidden"
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
                          <DialogTitle>ویرایش محصول تامین کننده</DialogTitle>
                        </DialogHeader>

                        <SupplierProductForm
                          supplierProduct={activeSupplierProduct}
                          edit
                          setOpen={setOpen}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button variant={"outline"} size={"sm"} asChild>
                      <Link
                        href={`/suppliers?supplierId=${supplierProduct.supplier.id}`}
                      >
                        تامین کننده
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(supplierProduct.id);
                      }}
                      size="sm"
                    >
                      حذف
                    </Button>
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

function NewSupplierProductForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="محصول جدید"
      buttonText="محصول جدید"
      open={open}
      setOpen={setOpen}
    >
      <SupplierProductForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default SuppliersProductsTable;
