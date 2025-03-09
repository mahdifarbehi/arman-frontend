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
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(data.length);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {products.length !== 0 && currentItems.length !== 0 && (
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
            {currentItems.map((product: Product) => {
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
                          onProductSubmit={() => {
                            setOpen(false);
                          }}
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
      <div className="flex justify-center mt-4 mb-5">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronRight className="h-4 w-4" />
          صفحه قبل
        </Button>
        <div className="flex items-center mx-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          صفحه بعد
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default ProductsTable;
