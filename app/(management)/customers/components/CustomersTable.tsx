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
import { ChevronLeft, ChevronRight } from "lucide-react";

function CustomersTable({ data, setCustomerIds }: { data; setCustomerIds }) {
  const [open, setOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

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
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {customers.length !== 0 && currentItems.length !== 0 && (
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
            {currentItems.map((customer) => {
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
                          onCustomerSubmit={() => {
                            setOpen(false);
                          }}
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

export default CustomersTable;
