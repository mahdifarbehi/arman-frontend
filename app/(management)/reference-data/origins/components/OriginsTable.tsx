"use client";
import { useEffect, useState } from "react";
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
import OriginForm from "./OriginForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
// import type { Origin } from "@/utils/types";
import { deleteCustomerOriginAction } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";

function OriginsTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeOrigin, setActiveOrigin] = useState<[] | undefined>(undefined);
  const handleOpenDialog = (origin) => {
    setActiveOrigin(origin);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    const result = await deleteCustomerOriginAction(id);
    if (result.message) toast({ description: result.message });
  };
  useEffect(() => {
    if (open === false) setActiveOrigin(undefined);
  }, [open, activeOrigin]);

  const origins = data;
  return (
    <div className="border border-gray-200 rounded-xl ">
      {origins.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع مبدا ها : {origins.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">عنوان</TableHead>
              <TableHead className="text-center"> توضیحات </TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {origins.map((origin) => {
              const { id: originId, title, description } = origin;
              return (
                <TableRow key={originId}>
                  <TableCell className="text-center">{title}</TableCell>
                  <TableCell className="text-center">{description}</TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(origin)}
                          size="sm"
                        >
                          ویرایش
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="[&>button]:hidden "
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
                          <DialogTitle>ویرایش مبدا</DialogTitle>
                        </DialogHeader>

                        <OriginForm
                          origin={activeOrigin}
                          edit
                          setOpen={setOpen}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button size={"sm"} onClick={() => handleDelete(originId)}>
                      حذف
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

export default OriginsTable;
