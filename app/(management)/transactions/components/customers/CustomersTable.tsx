import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CustomerForm from "@/app/(management)/customers/components/CustomerForm";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
function CustomersTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const customer = data;

  return (
    <Table dir="rtl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10rem] text-right">
            نام و نام خانوادگی
          </TableHead>
          <TableHead className="w-[12rem] text-right">نام شرکت</TableHead>
          <TableHead className="w-[12rem] text-right">شماره تماس </TableHead>
          <TableHead className="w-[15rem] text-right">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={customer.id}>
          <TableCell className="w-[10rem] text-right">
            {customer.fullname}
          </TableCell>
          <TableCell className="w-[12rem] text-right">
            {customer.company}
          </TableCell>
          <TableCell className="w-[6rem] text-right">
            {customer?.phones && customer.phones[0]?.phone}
          </TableCell>
          <TableCell className="w-[15rem] text-right flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
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
                  <DialogTitle>ویرایش مشتری</DialogTitle>
                </DialogHeader>

                <CustomerForm customer={customer} edit setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default CustomersTable;
