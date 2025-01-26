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

function Sellers() {
  return (
    <div className="mt-16 w-full flex-col justify-center items-center ">
      <Button className="w-32 m-4 mt-0" variant="outline">
        بازه زمانی
      </Button>
      <Table dir="rtl">
        <TableCaption>مجموع فروشندگان </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[8rem] text-right">نام فروشنده</TableHead>
            <TableHead className="w-[8rem] text-right">نام مدیر فروش</TableHead>
            <TableHead className="w-[8rem] text-right">تارگت ماهیانه</TableHead>
            <TableHead className="w-[8rem] text-right">مجموع فروش </TableHead>
            <TableHead className="w-[8rem] text-right"> فروش موفق</TableHead>
            <TableHead className="w-[8rem] text-right"> فروش ناموفق </TableHead>
            <TableHead className="w-[8rem] text-right">
              مجموع پورسانت{" "}
            </TableHead>
            <TableHead className="w-[8rem] text-right">تارگت ماهیانه</TableHead>
            <TableHead className="w-[8rem] text-right">
              مجموع سود شرکت
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-[8rem] text-right">بهرام بهرامی</TableCell>
            <TableCell className="w-[8rem] text-right">فرهاد فرهادی </TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
            <TableCell className="w-[8rem] text-right">10</TableCell>
            <TableCell className="w-[8rem] text-right">10</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
            <TableCell className="w-[8rem] text-right">10 میلیون</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Sellers;
