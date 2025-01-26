"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CustomErrorBoundary({message}:{message:string}) {
  const router = useRouter();
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600 mt-10">
        متاسفیم! خطایی رخ داده است.
      </h1>
      <p className="mt-4 text-lg text-gray-700 mb-10">{message==="Forbidden"?"شما اجازه دسترسی به این صفحه را ندارید":message}</p>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => router.push("/")}
          className="bg-gray-500 hover:bg-gray-600"
        >
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}
