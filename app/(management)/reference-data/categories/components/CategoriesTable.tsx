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
import CategoryForm from "./CategoryForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
// import type { Category } from "@/utils/types";
import { deleteCategoryAction } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";

function CategoriesTable({ data }: { data }) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<[] | undefined>(
    undefined
  );
  const handleOpenDialog = (category) => {
    setActiveCategory(category);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    const result = await deleteCategoryAction(id);
    if (result.message) toast({ description: result.message });
  };
  useEffect(() => {
    if (open === false) setActiveCategory(undefined);
  }, [open, activeCategory]);

  const categories = data;
  return (
    <div className="border border-gray-200 rounded-xl ">
      {categories.length !== 0 && (
        <Table dir="rtl">
          <TableCaption>مجموع دسته بندی ها : {categories.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">عنوان</TableHead>
              <TableHead className="text-center"> توضیحات </TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => {
              const { id: categoryId, title, description } = category;
              return (
                <TableRow key={categoryId}>
                  <TableCell className="text-center">{title}</TableCell>
                  <TableCell className="text-center">{description}</TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleOpenDialog(category)}
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
                          <DialogTitle>ویرایش دسته بندی</DialogTitle>
                        </DialogHeader>

                        <CategoryForm
                          category={activeCategory}
                          edit
                          setOpen={setOpen}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      size={"sm"}
                      onClick={() => handleDelete(categoryId)}
                    >
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

export default CategoriesTable;
