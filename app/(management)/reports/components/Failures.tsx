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

function Failures() {
  return (
    <div className="mt-16 w-full flex-col justify-center items-center ">
      <Button className="w-32 m-4 mt-0" variant="outline">
        بازه زمانی
      </Button>
      <Table dir="rtl">
        <TableCaption>مجموع شکست ها </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[8rem] text-right">عنوان </TableHead>
            <TableHead className="w-[8rem] text-right">دسته بندی </TableHead>
            <TableHead className="w-[8rem] text-right">تعداد </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-[8rem] text-right">
              مشتری مشتاق نبود
            </TableCell>
            <TableCell className="w-[8rem] text-right">خدمات سایت</TableCell>
            <TableCell className="w-[8rem] text-right">10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Failures;
