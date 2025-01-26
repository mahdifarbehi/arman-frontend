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

function Origins() {
  return (
    <div className="mt-16 w-full flex-col justify-center items-center ">
      <Button className="w-32 m-4 mt-0" variant="outline">
        بازه زمانی
      </Button>
      <Table dir="rtl">
        <TableCaption>مجموع مبدا ها </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[8rem] text-right">نام مبدا </TableHead>
            <TableHead className="w-[8rem] text-right">
              مجموع سود شرکت
            </TableHead>
            <TableHead className="w-[8rem] text-right">مجموع فروش </TableHead>
            <TableHead className="w-[8rem] text-right"> فروش موفق</TableHead>
            <TableHead className="w-[8rem] text-right"> فروش ناموفق </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-[8rem] text-right">سایت</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
            <TableCell className="w-[8rem] text-right">10</TableCell>
            <TableCell className="w-[8rem] text-right">10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Origins;
