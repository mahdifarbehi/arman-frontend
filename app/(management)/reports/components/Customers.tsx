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

function Customers() {
  return (
    <div className="mt-16 w-full flex-col justify-center items-center ">
      <Button className="w-32 m-4 mt-0" variant="outline">
        بازه زمانی
      </Button>
      <Table dir="rtl">
        <TableCaption>مجموع مشتریان </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[8rem] text-right">نام مشتری</TableHead>
            <TableHead className="w-[8rem] text-right">مجموع خرید</TableHead>
            <TableHead className="w-[15rem] text-right">
              مجموع سود شرکت
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-[8rem] text-right">بهرام بهرامی</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Customers;
