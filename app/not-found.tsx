"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - صفحه یافت نشد
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        صفحه‌ای که به دنبال آن هستید یافت نشد.
      </p>
      <Button asChild>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </Button>
    </div>
  );
}
