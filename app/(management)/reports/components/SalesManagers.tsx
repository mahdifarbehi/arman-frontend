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

function SalesManager() {
  return (
    <div className="mt-16 w-full flex-col justify-center items-center ">
      <Button className="w-32 m-4 mt-0" variant="outline">
        بازه زمانی
      </Button>
      <Table dir="rtl">
        <TableCaption>مجموع مدیران فروش </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">نام مدیر فروش</TableHead>
            <TableHead className="text-center">تعداد فروشندگان</TableHead>
            <TableHead className="text-center">مجموع فروش </TableHead>
            <TableHead className="text-center"> فروش موفق</TableHead>
            <TableHead className="text-center"> فروش ناموفق </TableHead>
            <TableHead className="text-center">مجموع سود شرکت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">بهرام بهرامی</TableCell>
            <TableCell className="text-center">10 </TableCell>
            <TableCell className="text-center">10 میلیون</TableCell>
            <TableCell className="text-center">10</TableCell>
            <TableCell className="text-center">10</TableCell>
            <TableCell className="text-center">10 میلیون</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default SalesManager;
