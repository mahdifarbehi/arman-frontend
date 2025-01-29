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
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Product } from "@/utils/types";
import { deleteProduct } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";

function ProductsTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | undefined>(
    undefined
  );
  const handleOpenDialog = (product: Product) => {
    setActiveProduct(product);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    const result = await deleteProduct(id);
    if (result.message) toast({ description: result.message });
  };
  useEffect(() => {
    if (open === false) setActiveProduct(undefined);
  }, [open, activeProduct]);

  const products = data;
  return (
    <div className="border border-gray-200 rounded-xl ">
      {products.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع محصولات : {products.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">عنوان</TableHead>
              <TableHead className="text-center">دسته بندی</TableHead>
              <TableHead className="text-center"> توضیحات </TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product) => {
              const { id: productId, title, category, description } = product;
              return (
                <TableRow key={productId}>
                  <TableCell className="text-center">{title}</TableCell>
                  <TableCell className="text-center">
                    {category.title}
                  </TableCell>
                  <TableCell className="text-center">{description}</TableCell>

                  <TableCell className="text-center flex justify-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(product)}
                          size="sm"
                        >
                          ویرایش
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="[&>button]:hidden "
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
                          <DialogTitle>ویرایش محصول</DialogTitle>
                        </DialogHeader>

                        <ProductForm
                          product={activeProduct}
                          edit
                          setOpen={setOpen}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button size={"sm"} onClick={() => handleDelete(productId)}>
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

export default ProductsTable;
