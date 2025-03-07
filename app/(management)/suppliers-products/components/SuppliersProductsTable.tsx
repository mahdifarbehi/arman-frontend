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
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {supplierProducts.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>
            مجموع محصولات تامین کنندگان : {supplierProducts.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">دسته بندی</TableHead>
              <TableHead className="text-center">نام محصول</TableHead>
              <TableHead className="text-center">تامین کننده</TableHead>
              <TableHead className="text-center">واحد</TableHead>
              <TableHead className="text-center">قیمت</TableHead>
              <TableHead className="text-center">قیمت با تخفیف</TableHead>
              <TableHead className="text-center">پورسانت فروشنده</TableHead>
              <TableHead className="text-center">کیفیت محصول</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
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
                  <TableCell className="text-center">{categoryTitle}</TableCell>
                  <TableCell className="text-center">{productTitle}</TableCell>
                  <TableCell className="text-center">{companyName}</TableCell>
                  <TableCell className="text-center">{unit}</TableCell>
                  <TableCell className="text-center">
                    {selling_price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {discount_price}
                  </TableCell>
                  <TableCell className="text-center">{commission}</TableCell>
                  <TableCell className="text-center">{quality}</TableCell>
                  <TableCell className="text-center justify-center flex gap-2">
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

export default SuppliersProductsTable;
