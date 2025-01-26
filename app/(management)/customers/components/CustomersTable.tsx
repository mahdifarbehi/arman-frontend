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
import ModalContainer from "@/components/common/ModalContainer";
import { Checkbox } from "@/components/ui/checkbox";
import CustomerForm from "@/app/(management)/customers/components/CustomerForm";
import { Button } from "@/components/ui/button";
import FilesForm from "./FilesForm";
import { X } from "lucide-react";
import type { Customer } from "@/utils/types";
import CustomerAssignmentForm from "./CustomerAssignmentForm";
import { CustomerStatus } from "@/utils/types";
function CustomersTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [assignmentFormOpen, setAssignmentFormOpen] = useState(false);
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
      <div className="m-16 flex justify-end items-center gap-4">
        <NewCustomerForm />
        <ModalContainer
          buttonText="دریافت از اکسل"
          dialogTitle="دریافت فایل"
          open={openFile}
          setOpen={setOpenFile}
        >
          <FilesForm />
        </ModalContainer>
        <ModalContainer
          dialogTitle="واگذاری به فروشنده"
          buttonText="واگذاری"
          open={assignmentFormOpen}
          setOpen={setAssignmentFormOpen}
        >
          <CustomerAssignmentForm
            customerIds={customerIds}
            setOpen={setAssignmentFormOpen}
          />
        </ModalContainer>
      </div>
      {customers.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع مشتریان : {customers.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10rem] text-right">دسته بندی </TableHead>
              <TableHead className="w-[8rem] text-right">مبدا مشتری</TableHead>
              <TableHead className="w-[8rem] text-right">نام شرکت</TableHead>
              <TableHead className="w-[8rem] text-right">
                نام و نام خانوادگی
              </TableHead>
              <TableHead className="w-[8rem] text-right">وضعیت</TableHead>
              <TableHead className="w-[8rem] text-right">شماره تماس</TableHead>
              <TableHead className="w-[8rem] text-right">فروشنده</TableHead>
              <TableHead className="w-[3rem] text-right">واگذاری</TableHead>
              <TableHead className="w-[15rem] text-center">عملیات</TableHead>
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
                  <TableCell className="w-[10rem] text-right">
                    {category?.title}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {origin?.title}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {company}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {fullname}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {status === CustomerStatus.NEW
                      ? "جدید"
                      : status === CustomerStatus.ACTIVE
                      ? "فعال"
                      : "غیرفعال"}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {phones[0]?.phone}
                  </TableCell>
                  <TableCell className="w-[8rem] text-right">
                    {assigned_to?.fullname}
                  </TableCell>
                  <TableCell className="w-[3rem] text-right">
                    <Checkbox
                      defaultChecked={false}
                      onCheckedChange={(e) =>
                        handleAssignments(customerId, Boolean(e))
                      }
                    />
                  </TableCell>
                  <TableCell className="w-[15rem] text-right flex gap-2">
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

function NewCustomerForm() {
  const [open, setOpen] = useState(false);
  return (
    <ModalContainer
      dialogTitle="مشتری جدید"
      buttonText="مشتری جدید"
      open={open}
      setOpen={setOpen}
    >
      <CustomerForm setOpen={setOpen} />
    </ModalContainer>
  );
}

export default CustomersTable;
