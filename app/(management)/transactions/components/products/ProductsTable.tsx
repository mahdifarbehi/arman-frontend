"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ModalContainer from "@/components/common/ModalContainer";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { toast } from "@/hooks/use-toast";
import { deleteTransactionProduct } from "@/utils/actions";
// import { toast } from "@/hooks/use-toast";

function ProductsTable({
  data,
  onRevalidation,
  transactionId,
}: {
  data;
  onRevalidation;
  transactionId;
}) {
  const [open, setOpen] = useState(false);
  // const [activeProduct, setActiveProduct] = useState(null);
  //   const handleOpenDialog = (task) => {
  //     setActiveProduct(task);
  //     setOpen(true);
  //   };

  //   useEffect(() => {
  //     if (open === false) setActiveProduct(null);
  //   }, [open, activeProduct]);
  const products = data;
  console.log(products);

  const handleDelete = async (id: number) => {
    const { message, success } = await deleteTransactionProduct(id);
    if (message) toast({ description: message });
    if (success) onRevalidation();
  };
  return (
    <div className="border border-gray-200 rounded-xl ">
      <div className="m-16 flex justify-end items-center gap-4">
        <ModalContainer
          dialogTitle="محصول جدید"
          buttonText="محصول جدید"
          open={open}
          setOpen={setOpen}
        >
          <ProductForm
            setOpen={setOpen}
            revalidation={onRevalidation}
            transactionId={transactionId}
          />
        </ModalContainer>
      </div>
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10rem] text-right">عنوان</TableHead>
            <TableHead className="w-[12rem] text-right">واحد</TableHead>
            <TableHead className="w-[12rem] text-right">تعداد</TableHead>
            <TableHead className="w-[6rem] text-right">قیمت</TableHead>
            <TableHead className="w-[6rem] text-right">قیمت با تخفیف</TableHead>
            <TableHead className="w-[15rem] text-right">توضیحات</TableHead>
            <TableHead className="w-[5rem] text-right">تخفیف</TableHead>
            <TableHead className="w-[5rem] text-right">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => {
            const {
              id: productId,
              product_supplier: {
                id: supplierId,
                discount_price,
                selling_price,
                unit,
                product: { title },
              },
              quantity,
              discount,
              description,
            } = product;
            return (
              <TableRow key={`${productId}-${index}`}>
                <TableCell className="w-[10rem] text-right">{title}</TableCell>
                <TableCell className="w-[12rem] text-right">{unit}</TableCell>
                <TableCell className="w-[12rem] text-right">
                  {quantity}
                </TableCell>
                <TableCell className="w-[6rem] text-right">
                  {selling_price}
                </TableCell>
                <TableCell className="w-[15rem] text-right">
                  {discount_price}
                </TableCell>
                <TableCell className="w-[15rem] text-right">
                  {description}
                </TableCell>
                <TableCell className="w-[5rem] text-right">
                  <Checkbox defaultChecked={discount} disabled />
                </TableCell>
                <TableCell className="w-[5rem] text-right flex gap-2">
                  <Button
                    onClick={() => {
                      handleDelete(productId);
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
    </div>
  );
}

export default ProductsTable;
