"use client";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

type ModalContainerProps = {
  children: ReactNode;
  buttonText: string;
  dialogTitle: string; open:boolean;
  setOpen:(state:boolean)=>void
};
function ModalContainer({
  children,
  buttonText,
  dialogTitle,
 open, setOpen
}: ModalContainerProps) {
  return (
    <Button asChild>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant="outline" size="default">
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent
          className="[&>button]:hidden"
          aria-describedby={undefined}
          aria-hidden={false}
        >
          <DialogHeader className="flex flex-row-reverse justify-between items-center">
            <button
              onClick={() => setOpen(false)}
              className="p-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    </Button>
  );
}

export default ModalContainer;
