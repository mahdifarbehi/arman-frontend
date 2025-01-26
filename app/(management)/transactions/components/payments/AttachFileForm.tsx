import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {  handlePaymentAttachmentUpload } from "@/utils/actions";
import { RxReload } from "react-icons/rx";

function AttachFilesForm({
  paymentId,
  revalidation,
  setOpen,
}: {
  paymentId: string;
  revalidation: () => void;
  setOpen?: (state: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", paymentId);
      setLoading(true);
      const { message, success } = await handlePaymentAttachmentUpload(
        null,
        formData
      );
      if (success) {
        toast({ description: message });
        revalidation();
        setOpen(false)
      } else {
        toast({ description: message || "خطایی در هنگام آپلود فایل رخ داد." });
      }
      setLoading(false);
    } else {
      toast({ description: "ابتدا یک فایل انتخاب کنید" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-2 w-64">
        <Input
          type="file"
          id="file"
          //   accept=".xlsx, .xls, .csv"
          onChange={(e) => handleFileChange(e)}
          ref={fileInputRef}
          className="hidden"
        />
        <Button type="button" onClick={handleUploadClick}>
          آپلود فایل
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <RxReload className="mr-2 h-4 w-4 animate-spin" />
              منتظر بمانید...
            </>
          ) : (
            "ثبت"
          )}
        </Button>
      </div>
    </form>
  );
}

export default AttachFilesForm;
