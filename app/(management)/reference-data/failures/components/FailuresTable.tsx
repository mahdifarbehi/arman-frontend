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
import FailureForm from "./FailureForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
// import type { Failure } from "@/utils/types";
import { deleteFailureAction } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";

function FailuresTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeFailure, setActiveFailure] = useState<[] | undefined>(undefined);
  const handleOpenDialog = (failure) => {
    setActiveFailure(failure);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    const result = await deleteFailureAction(id);
    if (result.message) toast({ description: result.message });
  };
  useEffect(() => {
    if (open === false) setActiveFailure(undefined);
  }, [open, activeFailure]);

  const failures = data;
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {failures.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع دلایل شکست ها : {failures.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">عنوان</TableHead>
              <TableHead className="text-center"> توضیحات </TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {failures.map((failure) => {
              const { id: failureId, title, description } = failure;
              return (
                <TableRow key={failureId}>
                  <TableCell className="text-center">{title}</TableCell>
                  <TableCell className="text-center">{description}</TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(failure)}
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
                          <DialogTitle>ویرایش دلایل شکست</DialogTitle>
                        </DialogHeader>

                        <FailureForm
                          failure={activeFailure}
                          edit
                          setOpen={setOpen}
                          onFailureSubmit={() => {
                            console.log("ok");
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button size={"sm"} onClick={() => {}}>
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

export default FailuresTable;
