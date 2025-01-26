"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function NotFound() {
  const { error } = useSelector((state: RootState) => state.store);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center" dir="rtl">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{error} </h1>
        <p className="mt-2 text-gray-600">
          متأسفیم، معامله ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="mt-6 space-x-4 space-x-reverse">
          <Button variant="outline" asChild>
            <Link href="/transactions">بازگشت به صفحه معاملات</Link>
          </Button>

          <Button asChild>
            <Link href="/">بازگشت به خانه</Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href="/customers">بازگشت به صفحه مشتریان</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
