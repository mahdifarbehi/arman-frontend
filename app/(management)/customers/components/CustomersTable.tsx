"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import CustomerForm from "@/app/(management)/customers/components/CustomerForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Customer } from "@/utils/types";
import { CustomerStatus } from "@/utils/types";
function CustomersTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [customerIds, setCustomerIds] = useState<number[]>([]);

  const handleOpenDialog = (customer: Customer) => {
    setActiveCustomer(customer);
    setOpen(true);
  };

  useEffect(() => {
    if (open === false) setActiveCustomer(null);
  }, [open, activeCustomer]);

  const handleAssignments = (userId: number, state: boolean) => {
    setCustomerIds((prevCustomerIds) => {
      if (state) {
        return prevCustomerIds.includes(userId)
          ? prevCustomerIds
          : [...prevCustomerIds, userId];
      } else {
        return prevCustomerIds.filter((id) => id !== userId);
      }
    });
  };

  const customers = data;

  return (
    <div className="border border-gray-200 rounded-xl ">
      {customers.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع مشتریان : {customers.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">دسته بندی </TableHead>
              <TableHead className="text-center">مبدا مشتری</TableHead>
              <TableHead className="text-center">نام شرکت</TableHead>
              <TableHead className="text-center">نام و نام خانوادگی</TableHead>
              <TableHead className="text-center">وضعیت</TableHead>
              <TableHead className="text-center">شماره تماس</TableHead>
              <TableHead className="text-center">فروشنده</TableHead>
              <TableHead className="text-center">واگذاری</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              const {
                id: customerId,
                fullname,
                company,
                status,
                category,
                assigned_to,
                origin,
                phones,
              } = customer;
              return (
                <TableRow key={customerId}>
                  <TableCell className="text-center">
                    {category?.title}
                  </TableCell>
                  <TableCell className="text-center">{origin?.title}</TableCell>
                  <TableCell className="text-center">{company}</TableCell>
                  <TableCell className="text-center">{fullname}</TableCell>
                  <TableCell className="text-center">
                    {status === CustomerStatus.NEW
                      ? "جدید"
                      : status === CustomerStatus.ACTIVE
                      ? "فعال"
                      : "غیرفعال"}
                  </TableCell>
                  <TableCell className="text-center">
                    {phones[0]?.phone}
                  </TableCell>
                  <TableCell className="text-center">
                    {assigned_to?.fullname}
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      defaultChecked={false}
                      onCheckedChange={(e) =>
                        handleAssignments(customerId, Boolean(e))
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(customer)}
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

                        <CustomerForm
                          customer={activeCustomer}
                          edit
                          setOpen={setOpen}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button asChild>
                      <Link href={`/transactions?customerId=${customerId}`}>
                        معاملات
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/transactions/new?customerId=${customerId}`}>
                        معامله جدید
                      </Link>
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

export default CustomersTable;
