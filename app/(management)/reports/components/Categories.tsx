import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

function Categories() {
  return (
    <div className="mt-16 w-full flex-col justify-center items-center ">
      <Button className="w-32 m-4 mt-0" variant="outline">
        بازه زمانی
      </Button>
      <Table dir="rtl">
        <TableCaption>مجموع دسته بندی ها </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">دسته بندی</TableHead>
            <TableHead className="text-center">مجموع فروش</TableHead>
            <TableHead className="text-center">مجموع سود شرکت</TableHead>
            <TableHead className="text-center">فروش موفق</TableHead>
            <TableHead className="text-center">فروش ناموفق</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">خدمات سایت</TableCell>
            <TableCell className="text-center">10 میلیون</TableCell>
            <TableCell className="text-center">10 میلیون</TableCell>
            <TableCell className="text-center">11</TableCell>
            <TableCell className="text-center">23</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Categories;
