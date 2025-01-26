"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
 const message = error.message.includes(
   "An error occurred in the Server Components render."
 )
   ? "مشکلی در پردازش درخواست شما رخ داده است. لطفاً دوباره تلاش کنید."
   : error.message;
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mt-10">
        متاسفیم! خطایی رخ داده است.
      </h1>
      <p className="mt-4 text-lg text-gray-700 mb-10">{message}</p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => reset()}>تلاش دوباره</Button>

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
